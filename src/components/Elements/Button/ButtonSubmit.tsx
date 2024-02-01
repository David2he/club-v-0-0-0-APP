import style from "./Button.module.scss";
import { ButtonSubmitProps } from "../../../types/Types";

export const ButtonSubmit = ({ text, callFunctionOnClick, size }: ButtonSubmitProps) => {
    return (
        <button className={`${style.button} ${size && style.large}`} onClick={callFunctionOnClick}>
            {text ? text : "Se connecter"}
        </button>
    );
};
