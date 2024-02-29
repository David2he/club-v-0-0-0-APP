import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { useParams } from "react-router-dom";
import { HamburguerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { ButtonSubmit } from "../../components/Elements/Button/ButtonSubmit";
import { handlePostData } from "../../services/api";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { toastType, BrandDataType } from "../../types/Types";
import { Toast } from "../../components/Blocks/Toast/Toast";
import { useState, useEffect } from "react";
import data from "../../utils/dataTest/data.json";
import { Footer } from "../../components/Blocks/Footer/Footer";
import { handleGetData } from "../../services/api";
import style from "./Brand.module.scss";

const Brand: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const [allBrandsData, setAllBrandsData] = useState<BrandDataType | null>(null);
    const [showToast, setshowToast] = useState<toastType>({ type: "", message: "", key: 0 });
    const { id } = useParams<{ id: string }>();

    const vendorData = data[id as keyof typeof data];

    const renderToast = (type: string, message: string) => {
        setshowToast({ type, message, key: Date.now() });
    };

    useEffect(() => {
        const getAllVendorInfo = async () => {
            try {
                const response = await handleGetData(`https://lodge-api.aihclubs.com/api/vendors/${id}`, {
                    headers: {},
                });
                setAllBrandsData(response.data.brands[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getAllVendorInfo();
    }, []);

    const handleActivateVIP = async () => {
        const token = await getStorageItem("token");
        try {
            const response = await handlePostData(`https://lodge-api.aihclubs.com/api/vendor/${id}/activate`, {
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
                {allBrandsData && (
                    <>
                        <div className={style.bannerImgContainer}>
                            <img src={allBrandsData.banner} alt='banner' />
                        </div>
                        <div className={style.brandMainInfoContainer}>
                            {allBrandsData && (
                                <img src={allBrandsData.logo} className={style.logoImgContainer} alt='logo' />
                            )}
                            <h1 className={style.brandName}>{allBrandsData.title}</h1>

                            <BlockText
                                title='Info de la marque'
                                text={allBrandsData.description}
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
                    </>
                )}
            </div>
        </IonPage>
    );
};
export default Brand;
