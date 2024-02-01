import style from "./Search.module.scss";
import { Input } from "../../Elements/Input/Input";
export const Search = () => {
    return (
        <div className={style.container}>
            <p>Vous chercher un produits ou une marque spécifiques</p>
            <Input placeholder='marque, produits ...' type='search' />
        </div>
    );
};
