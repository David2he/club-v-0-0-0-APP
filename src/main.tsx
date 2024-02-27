import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const options = {
    clientSecret: "pi_3Ok4HmA3ZxjOCe2M0w9DMxwU_secret_1UbZNkT01pBLPINkrWLkGvr8I",
};
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
