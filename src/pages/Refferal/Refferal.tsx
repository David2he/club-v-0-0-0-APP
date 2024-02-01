import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburguerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import "./Refferal.scss";
import { RefferalCodeInput } from "../../components/Elements/RefferalCodeInput/RefferalCodeInput";

const Refferal: React.FC = () => {
    const getRefferalCode = (): JSX.Element => {
        return (
            <>
                <RefferalCodeInput value={123456} />
            </>
        );
    };
    return (
        <IonPage id='main-content' className='containerMainAPP'>
            <div className='content'>
                <HamburguerMenue />
                <Header />
                <div>
                    <BlockText title='Code Parrainage ' text={getRefferalCode} closable={false} expandable={false} />
                    {/* <BlockText
                        title="Code Parrainage "
                        text={getRefferalCode}
                        closable={false}
                        expandable={false}
                    />
                    <BlockText
                        title="Code Parrainage "
                        text={getRefferalCode}
                        closable={false}
                        expandable={false}
                    /> */}
                </div>
            </div>
        </IonPage>
    );
};

export default Refferal;
