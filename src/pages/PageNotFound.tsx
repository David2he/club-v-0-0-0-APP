// src/pages/PageNotFound.tsx

import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Header } from "../components/Blocks/Header/Header";

const PageNotFound: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Header />
                <div className="container">
                    <h1>404</h1>
                    <p>Page not found</p>
                    <button>Revenir a l'acceuil</button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PageNotFound;
