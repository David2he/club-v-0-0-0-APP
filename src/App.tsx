import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthProvider } from "./services/contexts/AuthContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./theme/variables.scss";
import "./theme/rules.scss";

setupIonicReact();

import AppRouter from "./app/Router";

const App: React.FC = () => (
    <AuthProvider>
        <IonApp>
            <IonReactRouter>
                <AppRouter />
            </IonReactRouter>
        </IonApp>
    </AuthProvider>
);

export default App;
