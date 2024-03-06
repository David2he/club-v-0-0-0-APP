import style from "./DisplayItemsHomePageMenber.module.scss";
import { BlockText } from "../../Elements/BlockText/BlockText";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleGetData } from "../../../services/api";
import { VendorDataType } from "../../../types/Types";
export const DisplayItemsHomePageMenber = () => {
    const [typeOFdisplay, setTypeOFdisplay] = useState("line");
    const history = useHistory();
    const [allVendorsData, setAllVendorsData] = useState<VendorDataType[] | null>(null);
    const displayThemAll = (): JSX.Element => {
        useEffect(() => {
            const getAllVendorInfo = async () => {
                try {
                    const response = await handleGetData(
                        "https://lodge-api.aihclubs.com/api/vendors",
                        {
                            headers: {},
                        }
                    );
                    setAllVendorsData(response.data["hydra:member"]);
                } catch (error) {
                    console.log(error);
                }
            };
            getAllVendorInfo();
        }, []);

        const navigateToBrand = (brandId: number) => {
            history.push(`/HomePageMember/Brand${brandId}`);
        };

        return (
            <>
                <div className={style.typeDisplayingContainer}>
                    <div
                        className={`${style.displayImgContainer} ${style.displayThemInline}`}
                        onClick={() => setTypeOFdisplay("line")}
                    >
                        <img
                            src={`./assets/iconBlockText/${
                                typeOFdisplay === "line" ? "line_filled" : "line"
                            }.svg`}
                        />
                    </div>
                    <div
                        className={`${style.displayImgContainer} ${style.displayThemBlock}`}
                        onClick={() => setTypeOFdisplay("block")}
                    >
                        <img
                            src={`./assets/iconBlockText/${
                                typeOFdisplay === "block" ? "block_filled" : "block"
                            }.svg`}
                        />
                    </div>
                </div>
                <div
                    className={`${style.contentContainer} ${
                        typeOFdisplay === "block"
                            ? style.containerBlockDisplay
                            : style.containerLineDisplay
                    }`}
                >
                    {Array.isArray(allVendorsData) &&
                        allVendorsData.map((item: any) => {
                            return (
                                <div
                                    key={item["@id"]}
                                    className={style.eachCells}
                                    onClick={() => navigateToBrand(item["@id"])}
                                >
                                    <img src={item.brands[0].banner} />
                                </div>
                            );
                        })}
                </div>
            </>
        );
    };

    return (
        <div>
            <BlockText title="Nos marques" text={displayThemAll} closable={false} />
        </div>
    );
};
