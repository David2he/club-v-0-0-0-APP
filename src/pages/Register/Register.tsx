import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";

import { RegisterForm } from "../../components/Blocks/RegisterForm/RegisterForm";

const Register: React.FC = () => {
    return (
        <IonPage id="main-content" className="allContainer">
            <div className="headerRegister">
                <Header />
            </div>
            <div className="registerFormContainer">
                <RegisterForm />
            </div>
        </IonPage>
    );
};

export default Register;
