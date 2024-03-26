import style from "./Footer.module.scss";
import { useHistory } from "react-router";
import { useAuth } from "../../../services/contexts/AuthContext";
import { useStorageServices } from "../../../services/storages/useStorageServices";

export const Footer = () => {
    const auth = useAuth();
    const history = useHistory();
    const navigate = (where: string) => {
        history.push(where);
    };

    const { clearStorage } = useStorageServices();

    const disconnect = () => {
        clearStorage();
        history.push("/");
        window.location.reload();
    };

    return (
        <footer className={style.footer}>
            <p
                onClick={() => {
                    navigate("/Club");
                }}
            >
                Le Club™
            </p>
            <p
                onClick={() => {
                    navigate("/GetMyRefferal");
                }}
            >
                Parrainage
            </p>
            <p onClick={() => disconnect()}>Se deconnecter</p>
        </footer>
    );
};
