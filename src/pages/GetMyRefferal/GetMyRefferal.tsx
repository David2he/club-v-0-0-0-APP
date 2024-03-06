import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { RefferalCodeInput } from "../../components/Elements/RefferalCodeInput/RefferalCodeInput";

import "./GetMyRefferal.scss";
import { useEffect } from "react";

const GetMyRefferal: React.FC = () => {
    const getRefferalCode = (): JSX.Element => {
        return (
            <>
                <RefferalCodeInput />
            </>
        );
    };

    return (
        <IonPage id="main-content" className="container">
            <div className="burgerContainer">
                <HamburgerMenue />
            </div>
            <div className="content">
                <Header />
                <div>
                    <BlockText
                        title="Vos codes de parrainage"
                        text={getRefferalCode}
                        closable={false}
                        expandable={false}
                    />
                </div>
                <div>

                </div>
            </div>
        </IonPage>
    );
};

export default GetMyRefferal;
