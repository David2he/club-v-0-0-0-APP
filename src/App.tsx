import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import { AuthProvider } from "./services/contexts/AuthContext";
import { StripePaymentProvider } from "./services/contexts/StripePaymentContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./theme/variables.scss";
import "./theme/rules.scss";

setupIonicReact();

import AppRouter from "./app/Router";

const App: React.FC = () => (
    <AuthProvider>
        <StripePaymentProvider>
            <IonApp>
                <IonReactHashRouter>
                    <AppRouter />
                </IonReactHashRouter>
            </IonApp>
        </StripePaymentProvider>
    </AuthProvider>
);

export default App;
