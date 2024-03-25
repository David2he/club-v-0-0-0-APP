import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { HamburgerMenue } from "../../components/Blocks/HamburgerMenue/HamburgerMenue";
import { Footer } from "../../components/Blocks/Footer/Footer";
import { Input } from "../../components/Elements/Input/Input";
import { BlockText } from "../../components/Elements/BlockText/BlockText";
import { Search } from "../../components/Blocks/Search/Search";
import { DisplayItemsHomePageMenber } from "../../components/Blocks/DisplayItemsHomePageMenber/DisplayItemsHomePageMenber";
import { useStorageServices } from "../../services/storages/useStorageServices";
import "./HomePageMenber.scss";
import { useEffect, useState } from "react";

const HomePageMenber: React.FC = () => {
    const { getStorageItem } = useStorageServices();
    const [mail, setMail] = useState<string>("");
    const parraingageJSX = (): JSX.Element => {
        return (
            <div>
                <Input placeholder="email de la persone a parrainer" name="email" type="search" labelType="mail" />
            </div>
        );
    };

    useEffect(() => {
        const getMail = async () => {
            const tempMail = await getStorageItem("userInfo");
            setMail(tempMail.email);
        };
        getMail();
    }, []);

    const howItWorksText = () => {
        return (
            <div className="howItWorksTextContainer">
                <p>
                    <span>1</span>. Clic sur une des marques ci-dessous
                </p>
                <p>
                    <span>2</span>. Clic sur « Activer mon pass VIP »
                </p>
                <p>
                    <span>3</span>. Rdv en magasin ou sur le site internet de la marque
                </p>
                <p>
                    <span>4</span>.Au moment de payer, indique le même mail que celui de ton compte Club : {mail}
                </p>
                <p>PROFITE DES PRIX VIP 😊</p>
            </div>
        );
    };

    return (
        <IonPage id="main-content" className="allContainer">
            <div className="container">
                <div className="burgerContainer">
                    <HamburgerMenue />
                </div>
                <Header />
                <div className="content">
                    <div>
                        {/* <BlockText
                            title="Parrainer quelqu’un"
                            text={parraingageJSX}
                            closable={false}
                            expandable={true}
                        /> */}
                        <BlockText title="Comment ca marche " text={howItWorksText} closable={false} expandable={true} />
                        {/* <Search /> */}
                        <DisplayItemsHomePageMenber />
                    </div>
                    <Footer />
                </div>
            </div>
        </IonPage>
    );
};

export default HomePageMenber;
