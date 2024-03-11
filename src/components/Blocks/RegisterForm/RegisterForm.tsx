import { useState } from "react";
import style from "./RegisterForm.module.scss";
import { Input } from "../../Elements/Input/Input";
import { useHistory } from "react-router";
import { ButtonSubmit } from "../../Elements/Button/ButtonSubmit";
import {
    RegisterFormDataStateProps,
    RegisterFormDataToSendType,
    LoginFormDataToSendType,
    toastType,
} from "../../../types/Types";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import { useAuth } from "../../../services/contexts/AuthContext";
import { Toast } from "../Toast/Toast";
import { handlePostData } from "../../../services/api";
import { Footer } from "../Footer/Footer";

export const RegisterForm = () => {
    const history = useHistory();
    const { setStorageItem } = useStorageServices();
    const [isChecked, setIsChecked] = useState(false);
    const auth = useAuth();
    const [step, setStep] = useState<number>(0);
    const currentUrl = new URL(window.location.href);
    const [showToast, setshowToast] = useState<toastType>({ type: "", message: "", key: 0 });
    const [formData, setFormData] = useState<RegisterFormDataStateProps>({
        email: "",
        password: "",
        fName: "",
        name: "",
        phone: "",
        refferal: currentUrl.searchParams.get("code") ?? "",
    });

    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    const { login } = auth;

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    const postRegisterForm = async () => {
        try {
            const registerDataToSend: RegisterFormDataToSendType = {
                email: formData.email,
                password: formData.password,
                userInfo: {
                    firstName: formData.fName,
                    lastName: formData.name,
                    birthday: "2023-08-24T08:41:26.978Z", // TO DO ALLOW USER TO CHANGE BIRTHDAY
                    phoneNumber: formData.phone,
                },
                nonce: formData.refferal ? formData.refferal : "",
            };
            const loginDataToSend: LoginFormDataToSendType = {
                username: formData.email,
                password: formData.password,
            };
            if (isChecked === false) {
                setshowToast({
                    type: "error",
                    message: "Vous devez accepter les CGU avant de continuer",
                    key: Date.now(),
                });
                return;
            }
            const registerResponse = await handlePostData(
                "https://lodge-api.aihclubs.com/api/users",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registerDataToSend),
                }
            );
            console.log(registerResponse.status);
            if (registerResponse.status === 201) {
                console.log(registerResponse.status);
                const loginResponse = await handlePostData(
                    "https://lodge-api.aihclubs.com/api/login",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(loginDataToSend),
                    }
                );
                if (loginResponse.status === 200) {
                    await setStorageItem("token", loginResponse.data.token);
                    login();
                    history.push("/SubscriptionPage");
                }
                setshowToast({
                    type: "succes",
                    message: "Création de compte réussi",
                    key: Date.now(),
                });
            }
        } catch (error) {
            console.log(error);
            setshowToast({
                type: "error",
                message: "Erreur lors de l'enregistrement : " + error,
                key: Date.now(),
            });
        } finally {
        }
    };

    const handleFormRegister = (direction: string) => {
        const emailRegex = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

        if (direction === "back") {
            if (step === 0) {
                history.push("/");
            } else {
                setStep((prevState) => prevState - 1);
            }
            return;
        }

        if (step >= 0) {
            if (!emailRegex.test(formData.email)) {
                setshowToast({
                    type: "error",
                    message: "L'adresse e-mail n'est pas valide",
                    key: Date.now(),
                });
                return;
            }

            if (formData.password.length < 6) {
                setshowToast({
                    type: "error",
                    message: "Le mot de passe doit contenir 6 caractères",
                    key: Date.now(),
                });
                return;
            }
        }
        if (step >= 1) {
            if (formData.fName.length < 2 || formData.name.length < 2) {
                setshowToast({
                    type: "error",
                    message: "Le nom ou le prénom doit contenir au moins 2 caractères",
                    key: Date.now(),
                });
                return;
            }

            if (!phoneRegex.test(formData.phone)) {
                setshowToast({
                    type: "error",
                    message: "Le numéro de téléphone n'est pas valide",
                    key: Date.now(),
                });
                return;
            }
        }

        if (step < 2) {
            setStep((prevState) => prevState + 1);
        } else {
            postRegisterForm();
        }
    };

    const handleCorrectCheckForm = (value: string, correctCat: string) => {
        if (correctCat === "type") {
            if (value.includes("Password") || value.includes("password")) {
                return "password";
            } else {
                return value;
            }
        }
        if (correctCat === "icon") {
            if (value.includes("Password") || value.includes("password")) {
                return "password";
            } else if (value.includes("name") || value.includes("fName")) {
                return "identity";
            } else {
                return value;
            }
        }
    };
    // STEP 1
    const emailPasswordForm = () => {
        return (
            <>
                <Input
                    iconURL={"assets/iconInput/email.svg"}
                    altIcon={"iconMail"}
                    placeholder={"Mail"}
                    labelType={"email"}
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    type="classic"
                />
                <Input
                    iconURL={"assets/iconInput/password.svg"}
                    altIcon={"iconLock"}
                    placeholder={"Mot de passe"}
                    labelType={"password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    type="classic"
                />
            </>
        );
    };

    // STEP 2
    const nameForm = () => {
        return (
            <>
                <Input
                    iconURL={"assets/iconInput/identity.svg"}
                    altIcon={"iconMail"}
                    placeholder={"Nom"}
                    labelType={"fName"}
                    name="fName"
                    value={formData.fName}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    type="classic"
                />
                <Input
                    iconURL={"assets/iconInput/identity.svg"}
                    altIcon={"iconName"}
                    placeholder={"Prénom"}
                    labelType={"name"}
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    type="classic"
                />
                <Input
                    iconURL={"assets/iconInput/phone.svg"}
                    altIcon={"iconLock"}
                    placeholder={"+33 6 43 ......"}
                    labelType={"phone"}
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))
                    }
                    type="classic"
                />
            </>
        );
    };

    // STEP 3
    const lastCheckForm = () => {
        return (
            <>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <Input
                            iconURL={`assets/iconInput/${handleCorrectCheckForm(key, "icon")}.svg`}
                            altIcon={"iconLock"}
                            placeholder={`Enter your ${key}`}
                            labelType={handleCorrectCheckForm(key, "type")}
                            name={key}
                            value={value ?? ""}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            type="classic"
                        />
                    </div>
                ))}

                <label className={style.cgsLabel}>
                    <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
                    <p className={style.smallTextCGS}>
                        Cochez-moi pour accepter les <span className={style.cgsLink}>CGS</span>
                    </p>
                </label>
            </>
        );
    };
    let renderedForm;
    if (step === 0) {
        renderedForm = emailPasswordForm();
    } else if (step === 1) {
        renderedForm = nameForm();
    } else if (step === 2) {
        renderedForm = lastCheckForm();
    }
    return (
        <div className={style.formRegisterContainer}>
            <div className={style.inputContainer}>
                <div className={style.loadingBar}>
                    <span style={{ transform: `scaleX(${step * 50}%)` }}></span>
                </div>
                {renderedForm}
            </div>
            <div className={style.buttonContainer}>
                <button
                    className={`${style.backButton}`}
                    onClick={() => {
                        handleFormRegister("back");
                    }}
                >
                    Retour
                </button>

                <button
                    className={`${style.forwardButton}`}
                    onClick={() => {
                        handleFormRegister("forward");
                    }}
                >
                    Suivant
                </button>
            </div>
            <div className={style.toastContainer}>
                <Toast typeLog={showToast.type} message={showToast.message} key={showToast.key} />
            </div>
        </div>
    );
};
