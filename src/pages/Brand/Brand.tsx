import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { Link, useParams } from "react-router-dom";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { ButtonSubmit } from "../../components/Elements/Button/ButtonSubmit";
import { handlePostData } from "../../services/api";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { toastType, BrandDataType } from "../../types/Types";
import { Toast } from "../../components/Blocks/Toast/Toast";
import { useState, useEffect } from "react";
import { Footer } from "../../components/Blocks/Footer/Footer";
import { handleGetData } from "../../services/api";
import axios from "axios";
import style from "./Brand.module.scss";

// Display a brand page
const Brand: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const [waitingBrandActivation, setWaitingBrandActivation] = useState<boolean>(false);
    const [allBrandsData, setAllBrandsData] = useState<BrandDataType | null>(null);
    const [showToast, setshowToast] = useState<toastType>({ type: "", message: "", key: 0, time: 5000, infinite: false });
    const { id } = useParams<{ id: string }>();
    const [mail, setMail] = useState<string>("");

    const renderToast = (
        type: string,
        message: string | JSX.Element[] | (() => JSX.Element),
        time: number | undefined,
        infinite: boolean
    ) => {
        setshowToast({ type, message, key: Date.now(), time, infinite });
    };

    const validationMessage = () => {
        return (
            <div className={style.messageSuccesActivationToast}>
                <p>
                    <span>Votre compte a bien été activé</span>
                </p>
                <p>
                    Rdv en magasin ou sur le site internet de la marque <span>{mail}</span>
                </p>
                <p>
                    Au moment de payer, indique le même mail que celui de ton compte Club <span>{mail}</span>
                </p>
                <p>
                    Lien de la boutique activée
                    <a href="https://lodgeclub01.myshopify.com/" target="_blank" rel="noopener noreferrer">
                        https://lodgeclub01.myshopify.com/
                    </a>
                </p>
            </div>
        );
    };

    useEffect(() => {
        const getAllVendorInfo = async () => {
            const getUserInfo = await getStorageItem("userInfo");
            const token = await getStorageItem("token");
            const activateBrandDataToSend = {
                email: getUserInfo.email,
            };
            setMail(getUserInfo.email);
            try {
                const response = await handleGetData(`https://lodge-api.aihclubs.com/api/vendors/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllBrandsData(response.data.brands[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getAllVendorInfo();
    }, []);

    const handleActivateVIP = async () => {
        try {
            setWaitingBrandActivation(true);
            const token = await getStorageItem("token");
            const activateBrandDataToSend = {
                email: mail,
            };

            const response = await handlePostData(`https://lodge-api.aihclubs.com/api/vendor/${id}/activate`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(activateBrandDataToSend),
            });
            if (response.status === 200) {
                setWaitingBrandActivation(false);

                renderToast("succes", validationMessage, 9000, true);
            }
        } catch (error) {
            setWaitingBrandActivation(false);
            if (axios.isAxiosError(error) && error.message) {
                console.error("Erreur lors de l'envoi des données :", error.message);
                renderToast("error", `Erreur lors de l'envoi des données ${error.message}`, 5000, false);
            }
        }
    };
    return (
        <IonPage id="main-content" className="allContainer">
            <div className="container">
                <div className="burgerContainer">
                    <HamburgerMenue />
                </div>
                <Header />
                <div className="content">
                    {showToast?.type && showToast?.message && (
                        <Toast
                            typeLog={showToast.type}
                            message={showToast.message}
                            key={showToast.key}
                            time={showToast.time}
                            infinite={showToast.infinite}
                        />
                    )}
                    <div className={style.brandContainer}>
                        {waitingBrandActivation && (
                            <div className={style.loaderContainer}>
                                <span className={style.loader}></span>
                            </div>
                        )}
                        {allBrandsData && (
                            <>
                                <div className={style.bannerImgContainer}>
                                    <img src={allBrandsData.banner} alt="banner" />
                                </div>
                                <div className={style.brandMainInfoContainer}>
                                    {allBrandsData && <img src={allBrandsData.logo} className={style.logoImgContainer} alt="logo" />}
                                    <h1 className={style.brandName}>{allBrandsData.title}</h1>
                                    <BlockText
                                        title="Info de la marque"
                                        text={allBrandsData.description}
                                        closable={false}
                                        expandable={false}
                                    />
                                </div>
                                <div className={style.activeBrandButtonContainer}>
                                    <div className={style.test}>
                                        <ButtonSubmit text="Activer mon pass VIP" size="large" callFunctionOnClick={handleActivateVIP} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </IonPage>
    );
};
export default Brand;
