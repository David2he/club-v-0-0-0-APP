import { useState, useEffect } from "react";
import { Storage } from "@ionic/storage";

export const useStorageServices = () => {
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

    return {
        setStorageItem,
        getStorageItem,
    };
};
