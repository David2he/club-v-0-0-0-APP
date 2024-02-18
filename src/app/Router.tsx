import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import RegisterFormContainer from "../pages/RegisterFormContainer/RegisterFormContainer";
import HomePageMenber from "../pages/HomePageMenber/HomePageMenber";
import SubscriptionPage from "../pages/SubscriptionsPage/SubscriptionPage";
import Brand from "../pages/Brand/Brand";
import Refferal from "../pages/Refferal/Refferal";
import Account from "../pages/Account/Account";

import { ProtectedRoute } from "../utils/Routing/ProtectedRoutes";
import StripePage from "../pages/StripePage/StripePage";

const AppRouter: React.FC = () => {
    return (
        <IonRouterOutlet animated={false}>
            {/* <Route exact path='/register' component={Register} /> */}
            <Route exact path="/RegisterFormContainer" component={RegisterFormContainer} />
            <ProtectedRoute
                exact
                path="/SubscriptionPage"
                visitorComponent={Home}
                loggedInComponent={StripePage}
                memberLoggedInComponent={StripePage}
            />
            <ProtectedRoute
                exact
                path="/"
                visitorComponent={Home}
                loggedInComponent={StripePage}
                memberLoggedInComponent={HomePageMenber}
            />
            <ProtectedRoute
                exact
                path="/Brand/:id"
                visitorComponent={Home}
                loggedInComponent={SubscriptionPage}
                memberLoggedInComponent={Brand}
            />
            <ProtectedRoute
                exact
                path="/Refferral"
                visitorComponent={Home}
                loggedInComponent={SubscriptionPage}
                memberLoggedInComponent={Refferal}
            />
            {/* 
           
            <ProtectedRoute exact path='/Refferral' authenticatedComponent={Refferal} unauthenticatedComponent={Home} />
            <ProtectedRoute exact path='/Account' authenticatedComponent={Account} unauthenticatedComponent={Home} /> */}
        </IonRouterOutlet>
    );
};

export default AppRouter;
