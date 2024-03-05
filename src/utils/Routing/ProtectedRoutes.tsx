import { ProtectedRouteProps, AuthContextType } from "../../types/Types";
import { Route } from "react-router";
import { useAuth } from "../../services/contexts/AuthContext";
import Home from "../../pages/Home";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    visitorComponent: VisitorComponent,
    loggedInComponent: LoggedInComponent,
    memberLoggedInComponent: MemberLoggedInComponent,
    ...rest
}) => {
    // const auth =
    const { isLogin, isMember, autoCheckLoginAndMember } = useAuth() as AuthContextType;
    const [authChecked, setAuthChecked] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const checkAuthStatus = async () => {
            await autoCheckLoginAndMember();
            setAuthChecked(true);
        };

        checkAuthStatus();
    }, [location.pathname, autoCheckLoginAndMember]);

    const baseRoute = () => <Route exact path="/" component={Home} />;
    let ComponentToRender: React.ComponentType<any> = VisitorComponent || baseRoute;

    if (!authChecked) {
        return <div className="allContainer">Loading...</div>;
    }

    if (isLogin && isMember && MemberLoggedInComponent) {
        ComponentToRender = MemberLoggedInComponent;
    } else if (isLogin && LoggedInComponent) {
        ComponentToRender = LoggedInComponent;
    }

    return <Route {...rest} render={(props) => <ComponentToRender {...props} />} />;
};
