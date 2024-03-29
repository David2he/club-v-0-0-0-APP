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
import Contact from "../pages/Contact/Contact";
import PageNotFound from "../pages/PageNotFound";
import Club from "../pages/Club/Club";

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
                    memberLoggedInComponent={SubscriptionPage}
                />
                <ProtectedRoute
                    exact
                    path="/PaymentPage"
                    visitorComponent={Home}
                    loggedInComponent={StripePage}
                    memberLoggedInComponent={StripePage}
                />
                <ProtectedRoute
                    exact
                    path="/SuccessFullPayment"
                    visitorComponent={Home}
                    loggedInComponent={SuccessPaymentPage}
                    memberLoggedInComponent={SuccessPaymentPage}
                />
                <ProtectedRoute
                    exact
                    path="/"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
                    memberLoggedInComponent={HomePageMenber}
                />
                <ProtectedRoute
                    exact
                    path="/Home"
                    visitorComponent={Home}
                    loggedInComponent={SubscriptionPage}
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
                    path="/GetMyRefferal"
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
                    path="/Contact"
                    visitorComponent={Contact}
                    loggedInComponent={Contact}
                    memberLoggedInComponent={Contact}
                />
                <ProtectedRoute exact path="/Club" visitorComponent={Club} loggedInComponent={Club} memberLoggedInComponent={Club} />
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
