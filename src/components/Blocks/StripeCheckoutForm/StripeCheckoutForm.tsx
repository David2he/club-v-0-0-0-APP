import React from "react";
import style from "./StripeCheckoutForm.module.scss";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export const StripeCheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            console.log("Card Element not found.");
            return;
        }

        const result = await stripe.createToken(card);

        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log("Success:", result.token);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <PaymentElement />
            <p>test</p>
            <button type='submit' disabled={!stripe}>
                Payer
            </button>
        </form>
    );
};
