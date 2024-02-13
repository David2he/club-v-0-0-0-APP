import { IonPage } from "@ionic/react";
import { FormLogin } from "../components/Blocks/FormLogin/FormLogin";
import { Header } from "../components/Blocks/Header/Header";
import { ParrainageCodeLoginChoice } from "../components/Blocks/ParrainageCodeLoginChoice/ParrainageCodeLoginChoice";
import "./Home.scss";

const Home: React.FC = () => {
    return (
        <IonPage id='main-content' className='container'>
            <div className='headerContainer'>
                <Header />
            </div>
            <FormLogin />
            <ParrainageCodeLoginChoice />
        </IonPage>
    );
};

export default Home;
