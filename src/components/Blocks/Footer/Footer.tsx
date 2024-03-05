import style from "./Footer.module.scss";
import { useHistory } from "react-router";
import { useAuth } from "../../../services/contexts/AuthContext";
import { useEffect } from "react";
export const Footer = () => {
    const auth = useAuth();
    const history = useHistory();
    const navigate = (where: string) => {
        history.push(where);
    };

    return (
        <footer className={style.footer}>
            <p>Le club</p>
            <p
                onClick={() => {
                    navigate("/MentionsLégales");
                }}
            >
                Mentions légal
            </p>
        </footer>
    );
};
