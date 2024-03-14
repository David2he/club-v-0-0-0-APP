import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import style from "./StripePage.module.scss";
import { Header } from "../../components/Blocks/Header/Header";
import { StripeCheckoutForm } from "../../components/Blocks/StripeCheckoutForm/StripeCheckoutForm";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Footer } from "../../components/Blocks/Footer/Footer";

const StripePage: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const stripePromise = loadStripe(import.meta.env.VITE_API_PUBLIC_KEY_STRIPE_TEST);

    useEffect(() => {
        const init = async () => {
            const fetchedClientSecret = await getStorageItem("clientSecret");
            if (fetchedClientSecret) {
                setClientSecret(fetchedClientSecret);
            } else {
                console.log("Client secret not found");
            }
        };

        init();
    }, [getStorageItem]);

    if (!clientSecret) {
        return <div>Loading...</div>;
    }

    const options = { clientSecret };

    return (
        <IonPage id="main-content" className="allContainer">
            <div className="container">
                <div className="content">
                    <Header />
                </div>
                <div className={style.formPaymentContainer}>
                    <Elements stripe={stripePromise} options={options}>
                        <StripeCheckoutForm />
                    </Elements>
                </div>
                <Footer />
            </div>
        </IonPage>
    );
};

export default StripePage;
