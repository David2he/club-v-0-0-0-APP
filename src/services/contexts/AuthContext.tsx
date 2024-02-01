import { createContext, useState, useContext, useEffect } from "react";
import { useStorageServices } from "../storages/useStorageServices";
import { AuthContextType, UserType } from "../../types/Types";
import { decodeToken } from "react-jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

    const { getStorageItem } = useStorageServices();
    const [user, setUser] = useState<UserType | null>(null);
    useEffect(() => {
        autoCheckToken();
        // getInfoUser();
    }, [getStorageItem]);

    const login = () => {
        setIsAuthenticated(true);
    };

    const autoCheckToken = async () => {
        const token = await getStorageItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    };
    const getInfoUser = async () => {
        const token = await getStorageItem("token");
        if (token) {
            try {
                let decoded = decodeToken(token);
                console.log(decoded);
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
    };

    const getUserData = async () => {};

    const logout = () => {
        setIsAuthenticated(false);
    };

    return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
};
