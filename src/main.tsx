import React from "react";
import { createRoot } from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
const stripePromise = loadStripe(import.meta.env.VITE_API_PUBLIC_KEY_STRIPE_TEST);

const options = {
    clientSecret: "pi_3Ok4HmA3ZxjOCe2M0w9DMxwU_secret_1UbZNkT01pBLPINkrWLkGvr8I",
};
root.render(
    <React.StrictMode>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </React.StrictMode>
);
