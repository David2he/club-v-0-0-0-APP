import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import style from "./Contact.module.scss";
const Contact: React.FC = () => {
    const contactText = () => {
        return (
            <div>
                <p className={style.text}>Chloé et David sont là pour toi, quelle que soit ta question !</p>
                <p className={style.text}>01 48 56 78 77 / hello@lodge.paris</p>
            </div>
        );
    };

    return (
        <IonPage id="main-content" className="container">
            <div className="burgerContainer">
                <HamburgerMenue />
            </div>
            <div className="content">
                <Header />
                <BlockText title="Contact" text={contactText} closable={false} expandable={false} />
            </div>
        </IonPage>
    );
};

export default Contact;
