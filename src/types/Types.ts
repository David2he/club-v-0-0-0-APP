import { RouteProps } from "react-router-dom";

export type InputProps = {
    iconURL?: string;
    altIcon?: string;
    labelType?: string;
    placeholder?: string;
    name?: string;
    value?: string | null; // Allow null values
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
};

export type ButtonSubmitProps = {
    text: string;
    callFunctionOnClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
    size?: string;
};

export type ParraingeFormProps = {
    goToUrl?: string;
    loginType?: string;
    onCodeFetch?: (code: string) => void;
};

export type toastProps = {
    typeLog: string;
    message: string;
};

export type RegisterFormDataStateProps = {
    email: string;
    password: string;
    fName: string;
    name: string;
    phone: string;
    parrainageCode: string | null;
};

export type RegisterFormDataInAccountStateProps = {
    email: string;
    password: string;
    fName: string;
    name: string;
    phone: string;
};

export type RegisterFormDataToSendType = {
    email: string;
    password: string;
    userInfo: {
        firstName: string;
        lastName: string;
        birthday: string;
        phoneNumber: string;
    };
    isAdmin?: boolean;
    isBrandAdmin?: boolean;
    nonce: string;
};

export type toastType = {
    type: string;
    message: string;
    key?: number;
};

export type LoginFormDataToSendType = {
    username: string;
    password: string;
};

export type BlockTextProps = {
    title: string;
    text: string | JSX.Element[] | (() => JSX.Element);
    closable?: boolean;
    expandable?: boolean;
};

export interface ProtectedRouteProps extends RouteProps {
    authenticatedComponent: React.ComponentType<any>;
    unauthenticatedComponent: React.ComponentType<any>;
}

export interface UserType {
    token: string;
    email: string;
}
export interface AuthContextType {
    isAuthenticated: boolean;
    user: UserType | null;
    login: () => void;
    logout: () => void;
}

export type RedirectProps = {
    path: string;
};

export interface CodeParrainageType {
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    onSubmitForm: (e: React.FormEvent) => Promise<void>;
    getCurrentCode: (onCodeFetch: (code: string) => void) => () => void;
    fetchCurrentCode: () => string;
}

export interface MyToken {
    name: string;
    exp: number;
}
