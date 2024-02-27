import style from "./BlockText.module.scss";
import { useState, useRef, useEffect } from "react";
import { BlockTextProps } from "../../../types/Types";
export const BlockText = ({ title, text, closable, expandable }: BlockTextProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isUnfolded, setIsUnfolded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;
    const foldUnfoldElement = () => {
        const content = contentRef.current;
        if (content) {
            if (isUnfolded) {
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        content.style.height = "0px";
                    });
                });
            } else {
                content.style.height = `${content.scrollHeight}px`;
            }
            setIsUnfolded((prevIsDeploy) => !prevIsDeploy);
        }
    };

    useEffect(() => {
        const content = contentRef.current;
        if (content && expandable) {
            if (isUnfolded) {
                content.style.height = `${content.scrollHeight}px`;
            } else {
                content.style.height = "0px";
            }
        }
    }, [isUnfolded]);

    return (
        <div className={style.container}>
            <div className={style.titleANDCrossContainer}>
                <p className={style.title}>{title}</p>
                {closable ? (
                    <div
                        className={style.actionPosition}
                        onClick={() => setIsOpen((prevIsopen) => !prevIsopen)}
                    >
                        <img src="./assets/iconBlockText/closeCross.svg" />
                    </div>
                ) : expandable ? (
                    <div
                        className={style.actionPosition}
                        onClick={foldUnfoldElement}
                        style={{ transform: `rotate(${isUnfolded ? "180" : "0"}deg)` }}
                    >
                        <img src="./assets/iconBlockText/foldV.svg" />
                    </div>
                ) : null}
            </div>
            <div ref={contentRef} className={`${style.contentContainer} `}>
                {typeof text === "string" ? (
                    <p className={style.text}>{text}</p>
                ) : typeof text === "function" ? (
                    text()
                ) : (
                    text
                )}
            </div>
        </div>
    );
};
