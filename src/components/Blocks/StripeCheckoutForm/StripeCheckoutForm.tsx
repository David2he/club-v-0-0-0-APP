import React from "react";
import { useHistory } from "react-router";
import style from "./StripeCheckoutForm.module.scss";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { StripeCheckoutFormProps } from "../../../types/Types";
import { useStripePayment } from "../../../services/contexts/StripePaymentContext";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import { useAuth } from "../../../services/contexts/AuthContext";
export const StripeCheckoutForm = () => {
    const history = useHistory();
    const { setStorageItem, getStorageItem } = useStorageServices();
    const auth = useAuth();
    if (!auth) {
        throw new Error("Auth context is undefined");
    }
    const { checkSubscribe } = auth;
    const stripe = useStripe();
    const elements = useElements();
    const stripePaymentContext = useStripePayment();
    if (!stripePaymentContext) {
        console.error("StripePaymentContext not available");
        return null;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log("Stripe.js hasn't loaded yet, or clientSecret is missing.");
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://lodge-club-app.s3-website.fr-par.scw.cloud/#/SuccessFullPayment",
                // return_url: "http://localhost:8100/#/SuccessFullPayment",
            },
        });

        if (result.error) {
            console.log(result.error.message);
            console.log(result);
        } else {
            console.log("Payment processing or succeeded!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.formPayment}>
            <PaymentElement />
            <button type="submit" disabled={!stripe} className={style.button}>
                Payer
            </button>
        </form>
    );
};
