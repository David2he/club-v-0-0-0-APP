import "./SubscriptionPage.scss";
import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
const SubscriptionPage: React.FC = () => {
    return (
        <IonPage id='main-content' className='container'>
            <div className='headerContainer'>
                <Header />
            </div>
            <div className='content'>
                <p>Subscription Page</p>
            </div>
        </IonPage>
    );
};

export default SubscriptionPage;
