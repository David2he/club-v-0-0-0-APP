import style from "./DisplayItemsHomePageMenber.module.scss";
import { BlockText } from "../../Elements/BlockText/BlockText";
import { useState } from "react";
import { useHistory } from "react-router-dom";
export const DisplayItemsHomePageMenber = () => {
    const [typeOFdisplay, setTypeOFdisplay] = useState("line");
    const history = useHistory();
    const displayThemAll = (): JSX.Element => {
        const navigateToBrand = (brandId: number) => {
            history.push(`/Brand/${brandId}`);
        };
        return (
            <>
                <div className={style.typeDisplayingContainer}>
                    <div
                        className={`${style.displayImgContainer} ${style.displayThemInline}`}
                        onClick={() => setTypeOFdisplay("line")}
                    >
                        <img src={`./assets/iconBlockText/${typeOFdisplay === "line" ? "line_filled" : "line"}.svg`} />
                    </div>
                    <div
                        className={`${style.displayImgContainer} ${style.displayThemBlock}`}
                        onClick={() => setTypeOFdisplay("block")}
                    >
                        <img
                            src={`./assets/iconBlockText/${typeOFdisplay === "block" ? "block_filled" : "block"}.svg`}
                        />
                    </div>
                </div>
                <div
                    className={`${style.contentContainer} ${
                        typeOFdisplay === "block" ? style.containerBlockDisplay : style.containerLineDisplay
                    }`}
                >
                    {Array.from(Array(5).keys()).map((item, index) => (
                        <div key={index} className={style.eachCells} onClick={() => navigateToBrand(index)}>
                            <img src={`./assets/Brand/${index}/lineImg.png`} />
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div>
            <BlockText title='Nos marques' text={displayThemAll} closable={false} />
        </div>
    );
};
