import { useStorageServices } from "../../services/storages/useStorageServices";
export const useClearStorage = () => {
    // const { clearStorageTest } = useStorageServices();
    const clearStorage = async () => {
        try {
            // clearStorageTest();
        } catch (error) {
            console.error("Erreur lors de la suppression du token", error);
        }
    };
    return {
        clearStorage,
    };
};
