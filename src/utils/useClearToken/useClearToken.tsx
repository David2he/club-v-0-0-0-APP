import { useStorageServices } from "../../services/storages/useStorageServices";
export const useClearToken = () => {
    const { setStorageItem } = useStorageServices();
    const clearToken = async () => {
        try {
            await setStorageItem("token", "");
        } catch (error) {
            console.error("Erreur lors de la suppression du token", error);
        }
    };
    return {
        clearToken,
    };
};
