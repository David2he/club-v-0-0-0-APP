import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import style from "./Club.module.scss";
const Club: React.FC = () => {
    const contactText = () => {
        return (
            <div className={style.textContainer}>
                <p>Notre Club, uniquement réservé aux célébrités et VIP à l’origine, s’est ouvert pour accueillir également leur amis !</p>
                <p>
                    Nous vous faisons profiter aujourd’hui de tout le réseau du Club pour vous offrir une expérience shopping
                    exceptionnelle.
                </p>
                <p>
                    Pas de codes ou de coupons, vous êtes reconnus toute l’année chez nos partenaires premiums, et vous avez des remises
                    entre 30% et 70% toute l’année et sur tous leurs produits.
                </p>
                <p>
                    Notre liste de partenaires est en train de grossir toutes les semaines, mais comme pour les membres du Club, nous
                    essayons de sélectionner uniquement des marques qui vous plaisent.
                </p>
                <p>
                    N'hésitez pas à nous écrire si vous avez des suggestions sur <span>hello@lodge.paris</span>
                </p>
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
                <BlockText title="Bienvenu au Club" text={contactText} closable={false} expandable={false} />
            </div>
        </IonPage>
    );
};

export default Club;
