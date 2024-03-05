import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { useHistory } from "react-router";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { useAuth } from "../../services/contexts/AuthContext";
import style from "./SuccessPayementPage.module.scss";
const SuccessPayementPage: React.FC = () => {
    const history = useHistory();
    const auth = useAuth();
    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    const { checkSubscribe } = auth;
    const { setStorageItem } = useStorageServices();
    const handleUserPay = async () => {
        await setStorageItem("isMember", "true");
        checkSubscribe();
        history.push("/HomePageMember");
    };
    return (
        <IonPage id="main-content" className="container">
            <div className="container">
                <div className="content">
                    <Header />
                    <div className={style.backHomeContainer}></div>
                    <p className="Mtext-1">Votre payement a eté validé</p>
                    <button
                        onClick={() => {
                            handleUserPay();
                        }}
                        className="submitButton"
                    >
                        Retourner a l'application
                    </button>
                </div>
            </div>
        </IonPage>
    );
};

export default SuccessPayementPage;
