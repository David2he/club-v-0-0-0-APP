// src/pages/PageNotFound.tsx

import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Header } from "../components/Blocks/Header/Header";
import { useHistory } from "react-router";
const PageNotFound: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Header />
                <div className="NotFoundPagecontainer">
                    <h1>404</h1>
                    <p>Page not found</p>
                    <button
                        onClick={() => {
                            history.push("/");
                        }}
                        className="submitButton"
                    >
                        Revenir a l'acceuil
                    </button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PageNotFound;
