import { IonPage } from "@ionic/react";
import { Header } from "../../components/Blocks/Header/Header";
import style from "./LegalNoticePage.module.scss";
import { BlockText } from "../../components/Elements/BlockText/BlockText";

const LegalNoticePage: React.FC = () => {
    return (
        <IonPage id="main-content" className="containerMainAPP">
            <div className="content">
                <Header />

                <div className={style.coreTextContainer}>
                    <BlockText
                        title="Info de la marque"
                        text={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum, risus in efficitur molestie, nisi est sagittis massa, nec sollicitudin ante libero quis dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque et velit nec urna lacinia consectetur nec a lectus. In nunc elit, porttitor vel vulputate vitae, convallis nec ipsum. Nulla cursus ac sapien ac dignissim. Donec pretium feugiat odio non euismod. Phasellus luctus tempus ante, quis vehicula purus vehicula maximus. Proin id imperdiet ipsum, vel mollis mauris. In hendrerit venenatis diam, non convallis leo dignissim at."
                        }
                        closable={false}
                        expandable={true}
                    />
                    <BlockText
                        title="Info de la marque"
                        text={
                            "Suspendisse vel auctor nisl, sit amet vehicula sem. Ut congue enim ac erat imperdiet, sed sagittis massa dapibus. Etiam finibus pharetra dolor, in ullamcorper nunc maximus nec. Nunc vehicula est vitae egestas ornare. Curabitur vel ex eros. Donec a gravida orci. Quisque euismod eleifend dui, eu bibendum arcu mollis a. Nulla sapien ipsum, mattis sed erat faucibus, elementum varius nunc. Vivamus aliquam odio id quam rhoncus molestie. Nunc elementum augue quis massa commodo, a dapibus tellus sagittis. Aenean sed lorem sem. Mauris vel turpis sed lectus commodo rutrum. Nullam dictum sem ut mi suscipit, finibus sollicitudin dui luctus. Aliquam justo urna, tempus at risus eget, lacinia hendrerit justo. In consectetur libero a tortor ultricies vehicula."
                        }
                        closable={false}
                        expandable={true}
                    />
                </div>
            </div>
        </IonPage>
    );
};

export default LegalNoticePage;
