import { ProtectedRouteProps } from "../../types/Types";
import { Route } from "react-router";
import { useAuth } from "../../services/contexts/AuthContext";
import Home from "../../pages/Home";
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    visitorComponent: VisitorComponent,
    loggedInComponent: LoggedInComponent,

    memberLoggedInComponent: MemberLoggedInComponent,
    ...rest
}) => {
    const auth = useAuth();

    const baseRoute = () => <Route exact path="/home" component={Home} />;
    let ComponentToRender: React.ComponentType<any> = VisitorComponent || baseRoute;

    if (auth) {
        if (auth.isLogin && auth.isMember && MemberLoggedInComponent) {
            ComponentToRender = MemberLoggedInComponent;
        } else if (auth.isLogin && LoggedInComponent) {
            ComponentToRender = LoggedInComponent;
        }
    }
    return <Route {...rest} render={(props) => <ComponentToRender {...props} />} />;
};
