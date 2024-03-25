import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../../../services/contexts/AuthContext";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import { Input } from "../../Elements/Input/Input";
import { handlePostData } from "../../../services/api";
import { LoginFormDataToSendType } from "../../../types/Types";
import { Toast } from "../Toast/Toast";
import { toastType } from "../../../types/Types";
import style from "./LoginForm.module.scss";

export const LoginForm = () => {
    const { setStorageItem, getStorageItem } = useStorageServices();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showToast, setshowToast] = useState<toastType>({ type: "", message: "", key: 0 });
    const auth = useAuth();

    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    useEffect(() => {
        const getuserMail = async () => {
            try {
                const getUserInfo = await getStorageItem("userInfo");
                const emailInStorage = getUserInfo.email;

                setFormData((prevState) => ({
                    ...prevState,
                    email: emailInStorage,
                }));
            } catch (error) {
                console.log("email not found");
            }
        };
        getuserMail();
    }, []);

    const { login } = auth;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const renderToast = (type: string, message: string) => {
        setshowToast({ type, message, key: Date.now() });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const dataToSend: LoginFormDataToSendType = {
                username: formData.email,
                password: formData.password,
            };

            const response = await handlePostData("https://lodge-api.aihclubs.com/api/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.status === 200) {
                await setStorageItem("token", response.data.token);
                login();
            }
        } catch (error) {
            renderToast("error", `la connexion a échoué ${error}`);
            console.error("Erreur lors de l'envoi des données :", error);
        }
    };

    return (
        <>
            <form id="container" className={style.formContainer} onSubmit={handleSubmit}>
                {showToast?.type && showToast?.message && (
                    <Toast typeLog={showToast.type} message={showToast.message} key={showToast.key} />
                )}
                <div className={style.inputContainer}>
                    <Input
                        iconURL={"assets/iconInput/email.svg"}
                        altIcon={"iconMail"}
                        placeholder={"Mail"}
                        labelType={"email"}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="classic"
                    />
                    <Input
                        iconURL={"assets/iconInput/password.svg"}
                        altIcon={"iconLock"}
                        placeholder={"Mot de passe"}
                        labelType={"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="classic"
                    />
                </div>
                <a href="#" className={style.link}>
                    mot de passe oublié ?
                </a>
                <input type="submit" value="Se connecter" className="submitButton"></input>
            </form>
        </>
    );
};
