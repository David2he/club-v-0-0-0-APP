import style from "./HamburgerMenue.module.scss";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useClearToken } from "../../../utils/useClearToken/useClearToken";
export const HamburguerMenue = () => {
    const history = useHistory();
    const hamburgerMenueRef = useRef<HTMLDivElement>(null);
    const [opnMenu, setOpnMenu] = useState(false);
    const navigate = (where: string) => {
        history.push(where);
    };
    const { clearToken } = useClearToken();

    useEffect(() => {
        const handleClickOutsideHamburgerMenue = (e: any) => {
            if (hamburgerMenueRef.current && !hamburgerMenueRef.current.contains(e.target)) {
                setOpnMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideHamburgerMenue);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideHamburgerMenue);
        };
    }, [hamburgerMenueRef]);
    return (
        <div className={style.container} ref={hamburgerMenueRef}>
            <div className={style.hamburgerIcon} onClick={() => setOpnMenu((prevOpnMenu) => !prevOpnMenu)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`${style.containerHamburger} ${opnMenu ? style.openMenu : style.closeMenu}`}>
                <p onClick={() => navigate("/")}>Accueil</p>
                <p onClick={() => navigate("/Account")}>Mon compte</p>
                <p onClick={() => navigate("/Refferral")}>Parrainer</p>
                <p>Contact</p>
                <p onClick={() => clearToken()}>Clear Cache</p>
            </div>
        </div>
    );
};
