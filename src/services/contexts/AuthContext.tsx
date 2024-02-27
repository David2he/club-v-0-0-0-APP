import { createContext, useState, useContext, useEffect } from "react";
import { useStorageServices } from "../storages/useStorageServices";
import { AuthContextType, UserType } from "../../types/Types";
import { decodeToken } from "react-jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem("token")
    );
    const [isMember, setIsMember] = useState<boolean>(!!localStorage.getItem("isMember"));
    console.log(isMember);

    const { getStorageItem } = useStorageServices();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        autoCheckToken();
        getInfoUser();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const checkSubscribe = () => {
        setIsMember(true);
    };

    const autoCheckToken = async () => {
        const token = await getStorageItem("token");
        const isMember = await getStorageItem("isMember");
        console.log(token);
        if (isMember && token) {
            setIsAuthenticated(true);
            checkSubscribe();
        } else if (token) {
            setIsAuthenticated(true);
        }
    };
    const getInfoUser = async () => {
        const token = await getStorageItem("token");
        console.log(token);
        if (token) {
            try {
                const decoded = decodeToken(token) as { email: string };

                setUser({
                    token: token,
                    email: decoded.email as string,
                });
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isMember, user, login, logout, checkSubscribe }}
        >
            {children}
        </AuthContext.Provider>
    );
};
