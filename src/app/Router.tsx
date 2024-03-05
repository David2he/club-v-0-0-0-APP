import { Route, Switch } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import HomePageMenber from "../pages/HomePageMenber/HomePageMenber";
import SubscriptionPage from "../pages/SubscriptionsPage/SubscriptionPage";
import Brand from "../pages/Brand/Brand";
import GetMyRefferal from "../pages/GetMyRefferal/GetMyRefferal";
import Account from "../pages/Account/Account";
import SuccessPaymentPage from "../pages/SuccessPayementPage/SuccessPayementPage";
import LegalNoticePage from "../pages/LegalNoticePage/LegalNoticePage";
import { ProtectedRoute } from "../utils/Routing/ProtectedRoutes";
import StripePage from "../pages/StripePage/StripePage";
import PageNotFound from "../pages/PageNotFound";

const AppRouter: React.FC = () => {
    return (
        <IonRouterOutlet animated={false}>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/Register"
                    visitorComponent={Register}
                    loggedInComponent={Register}
                    memberLoggedInComponent={Register}
                />
                <ProtectedRoute
                    exact
                    path="/SubscriptionPage"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
                    memberLoggedInComponent={HomePageMenber}
                />
                <ProtectedRoute
                    exact
                    path="/PaymentPage"
                    visitorComponent={Home}
                    loggedInComponent={StripePage}
                    memberLoggedInComponent={HomePageMenber}
                />
                <ProtectedRoute
                    exact
                    path="/SuccessFullPayment"
                    visitorComponent={Register}
                    loggedInComponent={SuccessPaymentPage}
                    memberLoggedInComponent={SuccessPaymentPage}
                />
                <ProtectedRoute
                    exact
                    path="/"
                    visitorComponent={Home}
                    loggedInComponent={Home}
                    memberLoggedInComponent={HomePageMenber}
                />
                <ProtectedRoute
                    exact
                    path="/HomePageMember"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
                    memberLoggedInComponent={HomePageMenber}
                />
                <ProtectedRoute
                    exact
                    path="/HomePageMember/Brand/api/vendors/:id"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
                    memberLoggedInComponent={Brand}
                />
                <ProtectedRoute
                    exact
                    path="/Refferral"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
                    memberLoggedInComponent={GetMyRefferal}
                />
                <ProtectedRoute
                    exact
                    path="/Account"
                    visitorComponent={Home}
                    loggedInComponent={Account}
                    memberLoggedInComponent={Account}
                />
                <ProtectedRoute
                    exact
                    path="/MentionsLégales"
                    visitorComponent={LegalNoticePage}
                    loggedInComponent={LegalNoticePage}
                    memberLoggedInComponent={LegalNoticePage}
                />
                <Route path="*" component={PageNotFound} />
            </Switch>

            {/* 
           
            <ProtectedRoute exact path='/Refferral' authenticatedComponent={Refferal} unauthenticatedComponent={Home} />
            <ProtectedRoute exact path='/Account' authenticatedComponent={Account} unauthenticatedComponent={Home} /> */}
        </IonRouterOutlet>
    );
};

export default AppRouter;
