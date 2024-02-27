import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";

import { RegisterForm } from "../../components/Blocks/RegisterForm/RegisterForm";

const RegisterFormContainer: React.FC = () => {
    return (
        <IonPage id="main-content" className="container">
            <div className="headerRegister">
                <Header />
            </div>
            <div className="content">
                <RegisterForm />
            </div>
        </IonPage>
    );
};

export default RegisterFormContainer;
