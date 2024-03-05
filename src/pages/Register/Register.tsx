import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import style from "./Register.module.scss";
import { RegisterForm } from "../../components/Blocks/RegisterForm/RegisterForm";

const Register: React.FC = () => {
    return (
        <IonPage id="main-content" className="allContainer">
            <div className="container">
                <div className="content">
                    <Header />
                    <div>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </IonPage>
    );
};

export default Register;
