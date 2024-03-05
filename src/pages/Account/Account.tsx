import { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { RefferalCodeInput } from "../../components/Elements/RefferalCodeInput/RefferalCodeInput";
import { Input } from "../../components/Elements/Input/Input";
import { RegisterFormDataStateProps } from "../../types/Types";
import { useStorageServices } from "../../services/storages/useStorageServices";
import style from "./Account.module.scss";
import { useAuth } from "../../services/contexts/AuthContext";
import { handlePostData } from "../../services/api";
const Account: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const auth = useAuth();
    const [formData, setFormData] = useState<RegisterFormDataStateProps>({
        email: "",
        password: "",
        fName: "",
        name: "",
        phone: "",
        parrainageCode: "",
    });

    const submitChangeUserInfo = async () => {
        // const registerDataToSend: RegisterFormDataToSendType = {
        //     email: formData.email,
        //     password: formData.password,
        //     firstName: formData.fName,
        //     lastName: formData.name,
        //     phoneNumber: formData.phone,
        // };
        // try {
        //     const dataToSend: LoginFormDataToSendType = {
        //         username: formData.email,
        //         password: formData.password,
        //     };
        //     const changeUserInfoResponse = await handlePostData(
        //         "https://lodge-api.aihclubs.com/api/login",
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(dataToSend),
        //         }
        //     );
        // } catch (error) {
        //     console.error("Erreur lors de l'envoi des données :", error);
        // }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            let getUserInfo = await getStorageItem("userInfo");

            setFormData((prevState) => ({
                ...prevState,
                email: getUserInfo.email,
                fName: getUserInfo.userInfo.firstName,
                name: getUserInfo.userInfo.lastName,
                phone: getUserInfo.userInfo.phoneNumber,
            }));
        };
        getUserInfo();
    }, [auth]);
    return (
        <IonPage id="main-content" className="container">
            <div className="content">
                <HamburgerMenue />
                <Header />

                <div className={style.accountContainer}>
                    <div className={style.inputContainer}>
                        <Input
                            iconURL={"assets/iconInput/identity.svg"}
                            altIcon={"iconLock"}
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
                        {/* <Input
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
                        /> */}

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
                    </div>
                    <button onClick={() => submitChangeUserInfo()} className={style.submitButton}>
                        Enregistrer vos information
                    </button>
                </div>
            </div>
        </IonPage>
    );
};

export default Account;
