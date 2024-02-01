import style from "./Input.module.scss";
import { InputProps } from "../../../types/Types";

export const Input = ({
    iconURL,
    altIcon,
    placeholder,
    labelType,
    name,
    value,
    onChange,
    type,
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            <div className={`${type === "classic" ? style.inputBasic : style.inputSearch}`}>
                <label htmlFor={labelType}>
                    {iconURL && altIcon && <img src={iconURL} alt={altIcon} />}
                </label>
                <input
                    className={style.input}
                    type={labelType}
                    placeholder={placeholder}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                />
            </div>
        </>
    );
};
