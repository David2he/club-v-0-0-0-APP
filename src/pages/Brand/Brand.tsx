import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { useParams } from "react-router-dom";
import { HamburguerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { ButtonSubmit } from "../../components/Elements/Button/ButtonSubmit";
import { handlePostData } from "../../services/api";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { Toast } from "../../components/Blocks/Toast/Toast";
import { useState } from "react";
import data from "../../utils/dataTest/data.json";
import style from "./Brand.module.scss";
import { toastType } from "../../types/Types";
import { useAuth } from "../../services/contexts/AuthContext";
const Brand: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const [showToast, setshowToast] = useState<toastType>({ type: "", message: "", key: 0 });
    const { id } = useParams<{ id: string }>();
    const auth = useAuth();
    const vendorData = data[id as keyof typeof data];

    const renderToast = (type: string, message: string) => {
        setshowToast({ type, message, key: Date.now() });
    };

    const handleActivateVIP = async () => {
        const token = await getStorageItem("token");

        console.log(token);
        console.log(auth?.user);
        try {
            const response = await handlePostData("http://51.15.233.181:8000/api/vendor/1/activate", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                renderToast("succes", "votre pass VIP est activé");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            renderToast("error", `Erreur lors de l'envoi des données ${error}`);
        }
    };
    return (
        <IonPage id='main-content' className='containerMainAPP'>
            <div className='content'>
                <HamburguerMenue />
                {showToast?.type && showToast?.message && (
                    <Toast typeLog={showToast.type} message={showToast.message} key={showToast.key} />
                )}
                <Header />
                <div className={style.bannerImgContainer}>
                    <img src={`./assets/Brand/${id}/bannerImg.png`} alt='banner' />
                </div>

                <div className={style.brandMainInfoContainer}>
                    <img className={style.logoImgContainer} src={`./assets/Brand/${id}/logo.png`} alt='logo' />
                    <h1 className={style.brandName}>{vendorData?.vendorName}</h1>

                    <BlockText
                        title='Info de la marque'
                        text={vendorData.vendorDescription}
                        closable={false}
                        expandable={false}
                    />
                </div>
                <div className={style.activeBrandButtonContainer}>
                    <div className={style.test}>
                        <ButtonSubmit
                            text='Activer mon pass VIP'
                            size='large'
                            callFunctionOnClick={handleActivateVIP}
                        />
                    </div>
                </div>
            </div>
        </IonPage>
    );
};
export default Brand;
