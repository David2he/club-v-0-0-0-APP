import React, { createContext, useContext, useState } from "react";

const StripePaymentContext = createContext<{
    clientSecret: string;
    setClientSecret: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const useStripePayment = () => useContext(StripePaymentContext);

export const StripePaymentProvider = ({ children }: { children: React.ReactNode }) => {
    const [clientSecret, setClientSecret] = useState(
        "pi_3Ok4HmA3ZxjOCe2M0w9DMxwU_secret_1UbZNkT01pBLPINkrWLkGvr8I"
    );

    return (
        <StripePaymentContext.Provider value={{ clientSecret, setClientSecret }}>
            {children}
        </StripePaymentContext.Provider>
    );
};
