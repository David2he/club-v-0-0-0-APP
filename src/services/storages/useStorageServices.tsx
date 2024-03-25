import { useState, useEffect } from "react";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router";

export const useStorageServices = () => {
    const history = useHistory();
    const [storage] = useState(new Storage());

    useEffect(() => {
        const init = async () => {
            await storage.create();
        };
        init();
    }, [storage]);

    const setStorageItem = async (key: string, value: any) => {
        await storage.set(key, value);
    };

    const getStorageItem = async (key: string) => {
        const value = await storage.get(key);
        return value;
    };

    const clearStorage = async () => {
        const userInfoKey = "userInfo";
        let email = { email: "" };
        try {
            const userInfo = await storage.get(userInfoKey);
            email = userInfo.email;
        } catch (error) {
            console.log("email not found in storage");
        }
        await storage.clear();
        await storage.set(userInfoKey, { email: email });
    };

    const clearSpecificStorage = async (key: string) => {
        await storage.remove(key);
        window.location.reload();
    };

    return {
        setStorageItem,
        getStorageItem,
        clearStorage,
        clearSpecificStorage,
    };
};
