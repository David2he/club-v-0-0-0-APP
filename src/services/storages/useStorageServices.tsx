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
        await storage.clear();
        history.push("/");
    };

    return {
        setStorageItem,
        getStorageItem,
        clearStorage,
    };
};
