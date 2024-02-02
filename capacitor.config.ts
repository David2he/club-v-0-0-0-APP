import { CapacitorConfig } from "@capacitor/cli";
// import "dotenv/config";
const config: CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "club-v-0-0-0-APP",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
    plugins: {
        Stripe: {
            publishableKey: "pk_live_ybigacz6llYsIr7uxiuftLQN",
        },
    },
};

export default config;
