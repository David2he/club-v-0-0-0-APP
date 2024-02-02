import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import RegisterFormContainer from "../pages/RegisterFormContainer/RegisterFormContainer";
import HomePageMenber from "../pages/HomePageMenber/HomePageMenber";
import Brand from "../pages/Brand/Brand";
import Refferal from "../pages/Refferal/Refferal";
import Account from "../pages/Account/Account";

import { ProtectedRoute } from "../utils/Routing/ProtectedRoutes";
import StripePage from "../pages/StripePage/StripePage";

const AppRouter: React.FC = () => {
    return (
        <IonRouterOutlet animated={false}>
            <Route exact path='/home' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/RegisterFormContainer' component={RegisterFormContainer} />
            <Route exact path='/Payment' component={StripePage} />
            <ProtectedRoute
                exact
                path="/homePageMenber"
                authenticatedComponent={HomePageMenber}
                unauthenticatedComponent={Home}
            />
            <ProtectedRoute
                exact
                path="/"
                authenticatedComponent={HomePageMenber}
                unauthenticatedComponent={Home}
            />
            <ProtectedRoute
                exact
                path="/Brand/:id"
                authenticatedComponent={Brand}
                unauthenticatedComponent={Home}
            />
            <ProtectedRoute
                exact
                path="/Refferral"
                authenticatedComponent={Refferal}
                unauthenticatedComponent={Home}
            />
            <ProtectedRoute
                exact
                path="/Account"
                authenticatedComponent={Account}
                unauthenticatedComponent={Home}
            />
        </IonRouterOutlet>
    );
};

export default AppRouter;
