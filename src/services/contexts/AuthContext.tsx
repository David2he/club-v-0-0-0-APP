import { createContext, useState, useContext, useEffect } from "react";
import { useStorageServices } from "../storages/useStorageServices";
import { AuthContextType, UserType } from "../../types/Types";
import { handleGetData } from "../api";
import { decodeToken, isExpired } from "react-jwt";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState<boolean>(!!localStorage.getItem("token"));
    const [isMember, setIsMember] = useState<boolean>(!!localStorage.getItem("isMember"));

    const { getStorageItem, setStorageItem } = useStorageServices();
    const [user, setUser] = useState<UserType | null>(null);
    const { clearStorage } = useStorageServices();

    useEffect(() => {
        autoCheckLoginAndMember();
    }, []);

    const expiredTokenCheck = (token: string) => {
        console.log("token is expired ? : " + isExpired(token));
        return isExpired(token);
    };

    const login = () => {
        getInfoUser();
    };

    const logout = () => {
        setIsLogin(false);
        setIsMember(false);
        clearStorage();
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
        } else {
            setIsLogin(false);
            setIsMember(false);
        }
    };

    const autoCheckLoginAndMember = async () => {
        const token = await getStorageItem("token");
        if (!token) {
            logout();
            return;
        }
        const isTokenExpired = expiredTokenCheck(token);
        if (isTokenExpired) {
            logout();
            return;
        }
        const userInfo = await getStorageItem("userInfo");
        if (userInfo) {
            if (
                userInfo.roles.some((role: string) => ["ROLE_MEMBER_ACTIVE", "ROLE_ADMIN", "ROLE_BRAND_ADMIN"].includes(role)) &&
                userInfo.token
            ) {
                setIsMember(true);
                setIsLogin(true);
            } else if (userInfo.token) {
                setIsLogin(true);
                setIsMember(false);
            } else {
                logout();
            }
        } else {
            await getInfoUser();
        }
        return;
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                isMember,
                user,
                login,
                logout,
                checkSubscribe,
                autoCheckLoginAndMember,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
