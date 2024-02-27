import { IonPage } from "@ionic/react";
import { LoginForm } from "../components/Blocks/FormLogin/LoginForm";
import { Header } from "../components/Blocks/Header/Header";
import { ParrainageCodeLoginChoice } from "../components/Blocks/ParrainageCodeLoginChoice/ParrainageCodeLoginChoice";
import "./Home.scss";

const Home: React.FC = () => {
    return (
        <IonPage id='main-content' className='container'>
            <div className='headerContainer'>
                <Header />
            </div>
            <LoginForm />
            <ParrainageCodeLoginChoice />
        </IonPage>
    );
};

export default Home;
