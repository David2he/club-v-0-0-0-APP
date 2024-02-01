import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { ParrainageCodeForm } from "../../components/Elements/ParrainageCodeForm/ParrainageCodeForm";

const Register: React.FC = () => {
    return (
        <IonPage id='main-content' className='container'>
            <div className='headerContainer'>
                <Header />
            </div>
            <div className='content'>
                <ParrainageCodeForm loginType='register' />
            </div>
        </IonPage>
    );
};

export default Register;
