import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { StripeCheckoutForm } from "../../components/Blocks/StripeCheckoutForm/StripeCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import "dotenv/config";

const StripePage: React.FC = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_API_PUBLIC_KEY_STRIPE);
    return (
        <IonPage id="main-content" className="container">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="content">
                <Elements stripe={stripePromise}>
                    <StripeCheckoutForm />
                </Elements>
            </div>
        </IonPage>
    );
};

export default StripePage;
