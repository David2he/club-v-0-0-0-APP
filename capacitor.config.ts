import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "club-v-0-0-0-APP",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
    plugins: {
        Stripe: {
            publishableKey: import.meta.env.VITE_API_PUBLIC_KEY_STRIPE || "fallback_public_key",
        },
    },
};

export default config;
