import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { RefferalCodeInput } from "../../components/Elements/RefferalCodeInput/RefferalCodeInput";
import "./GetMyRefferal.scss";

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
            <div className="content">
                <HamburgerMenue />
                <Header />
                <div>
                    <BlockText
                        title="Code Parrainage "
                        text={getRefferalCode}
                        closable={false}
                        expandable={false}
                    />
                </div>
            </div>
        </IonPage>
    );
};

export default GetMyRefferal;
