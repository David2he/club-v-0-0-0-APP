import { createContext, useState, useContext, useEffect } from "react";
import { useStorageServices } from "../storages/useStorageServices";
import { AuthContextType, UserType } from "../../types/Types";
import { handleGetData } from "../api";
import { decodeToken } from "react-jwt";

import { useHistory } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(!!localStorage.getItem("token"));
    const [isMember, setIsMember] = useState<boolean>(!!localStorage.getItem("isMember"));

    const { getStorageItem, setStorageItem } = useStorageServices();
    const [user, setUser] = useState<UserType | null>(null);
    const { clearStorage } = useStorageServices();
    const history = useHistory();
    useEffect(() => {
        autoCheckLoginAndMember();
        // clearStorage();
    }, []);

    const login = () => {
        getInfoUser();
    };

    const logout = () => {
        clearStorage();
        setIsLogin(false);
    };

    const checkSubscribe = async () => {
        setIsMember(true);
    };

    const getInfoUser = async () => {
        const token = await getStorageItem("token");
        if (token) {
            try {
                const decoded = decodeToken(token) as { email: string; id: number };

                const response = await handleGetData(`https://lodge-api.aihclubs.com/api/users/${decoded.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response && response.data) {
                    const { email, roles, userInfo, isAdmin, isBrandAdmin } = response.data;

                    const userObject = {
                        token: token,
                        email: email,
                        id: decoded.id,
                        roles: roles,
                        userInfo: {
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            birthday: userInfo.birthday,
                            phoneNumber: userInfo.phoneNumber,
                            civilite: userInfo.civilite,
                            pays: userInfo.pays,
                            ville: userInfo.ville,
                            codePostal: userInfo.codePostal,
                            adresse1: userInfo.adresse1,
                        },
                        isAdmin: isAdmin,
                        isBrandAdmin: isBrandAdmin,
                    };

                    setUser(userObject);
                    await setStorageItem("userInfo", userObject);
                    autoCheckLoginAndMember();
                }
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
    };

    const autoCheckLoginAndMember = async () => {
        const userInfo = await getStorageItem("userInfo");

        if (userInfo) {
            if (userInfo.roles.includes("ROLE_MEMBER_ACTIVE") && userInfo.token) {
                setIsMember(true);
                setIsLogin(true);
            } else if (userInfo.token) {
                setIsLogin(true);
                setIsMember(false);
            } else {
                setIsLogin(false);
                setIsMember(false);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, isMember, user, login, logout, checkSubscribe }}>
            {children}
        </AuthContext.Provider>
    );
};
