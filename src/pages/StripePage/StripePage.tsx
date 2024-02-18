import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { StripeCheckoutForm } from "../../components/Blocks/StripeCheckoutForm/StripeCheckoutForm";
import { useStorageServices } from "../../services/storages/useStorageServices";
import React, { useEffect, useState } from "react";

const StripePage: React.FC = () => {
    const { setStorageItem, getStorageItem } = useStorageServices();
    const [clientSecret, setClientSecret] = useState("");

    // useEffect(() => {
    //     // Récupération asynchrone du clientSecret depuis le storage
    //     // const fetchClientSecret = async () => {
    //     //     const storedClientSecret = await getStorageItem("clientSecret");
    //     //     if (storedClientSecret) {
    //     //         setClientSecret(storedClientSecret);
    //     //     }
    //     // };

    //     // fetchClientSecret();
    //     setClientSecret("pi_3Ok4HmA3ZxjOCe2M0w9DMxwU_secret_1UbZNkT01pBLPINkrWLkGvr8I");
    // }, [getStorageItem]);

    return (
        <IonPage id="main-content" className="container">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="content">
                <StripeCheckoutForm />
            </div>
        </IonPage>
    );
};

export default StripePage;
