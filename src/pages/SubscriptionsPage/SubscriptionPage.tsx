import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import { useHistory } from "react-router";
import style from "./SubscriptionPage.module.scss";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Blocks/Footer/Footer";
import { useAuth } from "../../services/contexts/AuthContext";
import { useStorageServices } from "../../services/storages/useStorageServices";
import { handleGetData, handlePostData } from "../../services/api";

const SubscriptionPage: React.FC = () => {
    const { getStorageItem, setStorageItem } = useStorageServices();
    const [subscriptionItems, setSubscriptionItems] = useState<any[]>([]);
    const history = useHistory();
    const auth = useAuth();
    if (!auth) {
        throw new Error("Auth context is undefined");
    }

    useEffect(() => {
        const getSubscriptionsOffer = async () => {
            try {
                const token = await getStorageItem("token");
                console.log(token);
                const response = await handleGetData("https://lodge-api.aihclubs.com/api/subscriptions", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSubscriptionItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getSubscriptionsOffer();
    }, []);

    const handleGetInfoBeforePayment = async (subscribtionId: number) => {
        const token = await getStorageItem("token");

        const registerDataToSend = {
            subscription_id: subscribtionId,
        };
        try {
            const response = await handlePostData("https://lodge-api.aihclubs.com/api/subscribe", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(registerDataToSend),
            });
            await setStorageItem("clientSecret", response.data.clientSecret);
            history.push("/PaymentPage");
        } catch (error) {
            console.log(error + "error");
        }
    };

    return (
        <IonPage id="main-content" className="container">
            <div className="headerContainer">
                <Header />
            </div>
            <div className="content">
                <div className={style.allSubscibeContainer}>
                    {subscriptionItems.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={style.subscribeChoiceContainer}
                                onClick={() => handleGetInfoBeforePayment(item.id)}
                            >
                                <p className={style.priceText}>{item.amount} €</p>
                                <div className={style.textInfoContainer}>
                                    <p className={style.titleOffre}>{item.name}</p>
                                    <p>
                                        {item.subtitle} {item.additionalInformation}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </IonPage>
    );
};

export default SubscriptionPage;
