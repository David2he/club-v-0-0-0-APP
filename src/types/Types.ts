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
    message: string | JSX.Element[] | (() => JSX.Element);
    time?: number;
    infinite?: boolean;
};

export type RegisterFormDataStateProps = {
    email: string;
    password: string;
    fName: string;
    name: string;
    phone: string;
    refferal: string | null;
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

export interface ChangeUserInfoDataToSendType {
    email: string;
    userInfo: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
    };
}

export type toastType = {
    type: string;
    message: string | JSX.Element[] | (() => JSX.Element);
    key?: number;
    time?: number;
    infinite?: boolean;
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
    visitorComponent: React.ComponentType<any>;
    loggedInComponent?: React.ComponentType<any>;
    memberLoggedInComponent: React.ComponentType<any>;
    requiredState?: string[];
}

export interface UserInfoType {
    firstName: string;
    lastName: string;
    birthday: string;
    phoneNumber: string;
    civilite: string;
    pays: string;
    ville: string;
    codePostal: string;
    adresse1: string;
}
export interface UserType {
    token: string;
    email: string;
    id: number;
    roles: string[];
    userInfo: UserInfoType;
    isAdmin: boolean;
    isBrandAdmin: boolean;
}
export interface AuthContextType {
    isLogin: boolean;
    isMember: boolean;
    user: UserType | null;
    login: () => void;
    logout: () => void;
    checkSubscribe: () => void;
    autoCheckLoginAndMember: () => void;
    [key: string]: any;
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

export interface StripeCheckoutFormProps {
    clientSecret: string;
}

export interface StripePaymentContextType {
    clientSecret: string;
    setClientSecret: React.Dispatch<React.SetStateAction<string>>;
}

export interface BrandDataType {
    banner: string;
    logo: string;
    title: string;
    description: string;
}

export interface VendorDataType {
    "@id": string;
    brands: Array<{
        banner: string;
    }>;
}
