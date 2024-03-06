import { IonPage } from "@ionic/react";
import { LoginForm } from "../components/Blocks/FormLogin/LoginForm";
import { Header } from "../components/Blocks/Header/Header";
import { RefferalForm } from "../components/Blocks/RefferalForm/RefferalForm";
import "./Home.scss";
import { Footer } from "../components/Blocks/Footer/Footer";

const Home: React.FC = () => {
    return (
        <IonPage id="main-content" className="allContainer">
            <div className="container" style={{justifyContent: 'center'}}>
                <Header />
                <div className="formLoginAndRegisterContainer">
                    <LoginForm />
                    <RefferalForm />
                </div>
            </div>
        </IonPage>
    );
};

export default Home;
