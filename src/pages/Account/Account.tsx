import { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { RefferalCodeInput } from "../../components/Elements/RefferalCodeInput/RefferalCodeInput";
import { Input } from "../../components/Elements/Input/Input";
import { RegisterFormDataStateProps, ChangeUserInfoDataToSendType } from "../../types/Types";
import { useStorageServices } from "../../services/storages/useStorageServices";
import style from "./Account.module.scss";
import { useAuth } from "../../services/contexts/AuthContext";
import { handlePatchData } from "../../services/api";
const Account: React.FC = () => {
    const { getStorageItem, clearSpecificStorage } = useStorageServices();
    const auth = useAuth();
    const [formData, setFormData] = useState<RegisterFormDataStateProps>({
        email: "",
        password: "",
        fName: "",
        name: "",
        phone: "",
        refferal: "",
    });

    useEffect(() => {
        const getUserInfo = async () => {
            const getUserInfo = await getStorageItem("userInfo");
            if (getUserInfo) {
                setFormData((prevState) => ({
                    ...prevState,
                    email: getUserInfo.email,
                    fName: getUserInfo.userInfo.firstName,
                    name: getUserInfo.userInfo.lastName,
                    phone: getUserInfo.userInfo.phoneNumber,
                }));
            } else {
            }
        };
        getUserInfo();
    }, []);

    const submitChangeUserInfo = async () => {
        try {
            const user = await getStorageItem("userInfo");
            const token = await getStorageItem("token");
            console.log(user.id);
            const changeUserInfoDataToSend: ChangeUserInfoDataToSendType = {
                email: formData.email,
                userInfo: {
                    firstName: formData.fName,
                    lastName: formData.name,
                    phoneNumber: formData.phone,
                },
            };
            const changeUserInfoResponse = await handlePatchData(
                `https://lodge-api.aihclubs.com/api/users/${user.id}`,
                {
                    headers: {
                        "Content-Type": "application/merge-patch+json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(changeUserInfoDataToSend),
                }
            );
            clearSpecificStorage("userInfo");

            console.log(changeUserInfoResponse);
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            console.log(error);
        }
    };

    return (
        <IonPage id='main-content' className='container'>
            <div className='burgerContainer'>
                <HamburgerMenue />
            </div>
            <div className='content'>
                <Header />

                <div className={style.accountContainer}>
                    <div className={style.inputContainer}>
                        <Input
                            iconURL={"assets/iconInput/identity.svg"}
                            altIcon={"iconLock"}
                            placeholder={"Prénom"}
                            labelType={"name"}
                            name='name'
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            type='classic'
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
                            name='fName'
                            value={formData.fName}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            type='classic'
                        />
                        <Input
                            iconURL={"assets/iconInput/email.svg"}
                            altIcon={"iconMail"}
                            placeholder={"Mail"}
                            labelType={"email"}
                            name='email'
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            type='classic'
                        />
                        <Input
                            iconURL={"assets/iconInput/phone.svg"}
                            altIcon={"iconLock"}
                            placeholder={"+33 6 43 ......"}
                            labelType={"phone"}
                            name='phone'
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            type='classic'
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
