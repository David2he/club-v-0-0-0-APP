import style from "./SuccessActivationBrandBlock.module.scss";
interface test {
    title: string;
    message: string | JSX.Element[] | (() => JSX.Element);
}
export const SuccessActivationBrandBlock: React.FC<test> = ({ title, message }) => {
    return (
        <div className={style.messageContainer}>
            <div className={style.titleContainer}>
                <img src="/assets/iconModalLog/Success.svg" alt="succes" />
                <p className={style.title}>{title}</p>
            </div>
            {typeof message === "string" ? <p>{message}</p> : typeof message === "function" ? message() : message}
        </div>
    );
};
