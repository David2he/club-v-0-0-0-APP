import { ProtectedRouteProps } from "../../types/Types";
import { Route } from "react-router";
import { useAuth } from "../../services/contexts/AuthContext";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    authenticatedComponent: AuthComponent,
    unauthenticatedComponent: UnauthComponent,
    ...rest
}) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => (auth?.isAuthenticated ? <AuthComponent {...props} /> : <UnauthComponent {...props} />)}
        />
    );
};
