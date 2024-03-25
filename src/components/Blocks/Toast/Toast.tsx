import style from "./Toast.module.scss";
import { toastProps } from "../../../types/Types";
import { useState } from "react";

export const Toast: React.FC<toastProps> = ({ typeLog, message, time, infinite }) => {
    const [showLog, setShowLog] = useState<boolean>(true);
    const closeLog = () => {
        setShowLog(false);
    };

    const delayCloseLog = () => {
        setTimeout(() => {
            setShowLog(false);
        }, time);
    };
    if (infinite) {
    } else {
        delayCloseLog();
    }

    const resultTime = infinite ? 0 : `${time}ms`;

    const errorMessage = () => {
        return (
            <>
                <div className={`${style.messageContainer} ${style.errorLogContainer} ${showLog ? "" : style.closeLog}`}>
                    <div className={style.upLoader} style={{ animationDuration: ` ${resultTime}ms` }}></div>
                    <div className={style.titleContainer}>
                        <img src="/assets/iconModalLog/Error.svg" alt="succes" />
                        <p className={style.title}>{typeLog}</p>
                    </div>
                    {typeof message === "string" ? <p>{message}</p> : typeof message === "function" ? message() : message}
                    <img src="/assets/iconModalLog/closeError.svg" alt="succes" className={style.closeIcon} onClick={() => closeLog()} />
                </div>
            </>
        );
    };
    const succesMessage = () => {
        return (
            <>
                <div className={`${style.messageContainer} ${style.succesLogContainer} ${showLog ? "" : style.closeLog}`}>
                    <div className={style.upLoader} style={{ animationDuration: ` ${resultTime}ms` }}></div>
                    <div className={style.titleContainer}>
                        <img src="/assets/iconModalLog/Success.svg" alt="succes" />
                        <p className={style.title}>{typeLog}</p>
                    </div>
                    {typeof message === "string" ? <p>{message}</p> : typeof message === "function" ? message() : message}
                    <img src="/assets/iconModalLog/closeSuccess.svg" alt="succes" className={style.closeIcon} onClick={() => closeLog()} />
                </div>
            </>
        );
    };
    return <div className={style.logContainer}>{typeLog.length > 1 ? (typeLog === "error" ? errorMessage() : succesMessage()) : null}</div>;
};
