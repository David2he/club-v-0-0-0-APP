import React from "react";
import style from "./StripeCheckoutForm.module.scss";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { StripeCheckoutFormProps } from "../../../types/Types";
import { useStripePayment } from "../../../services/contexts/StripePaymentContext";

export const StripeCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const stripePaymentContext = useStripePayment();
    if (!stripePaymentContext) {
        console.error("StripePaymentContext not available");
        return null;
    }

    const { clientSecret } = stripePaymentContext;
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            console.log("Stripe.js hasn't loaded yet, or clientSecret is missing.");
            return;
        }

        // Ici, nous utilisons clientSecret avec confirmPayment pour finaliser le paiement
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://your-website.com/order/success",
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log("Payment processing or succeeded!");
            // Ici, vous pourriez vouloir réinitialiser le clientSecret après un paiement réussi
            // setClientSecret("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};
