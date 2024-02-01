import style from "./Header.module.scss";
import { useHistory } from "react-router";
export const Header = () => {
    const history = useHistory();
    const navigate = (where: string) => {
        history.push(where);
    };
    return (
        <header onClick={() => navigate("/")} className={style.header}>
            <img src={"assets/Logo/logo.svg"} alt={"icon"} />
        </header>
    );
};
