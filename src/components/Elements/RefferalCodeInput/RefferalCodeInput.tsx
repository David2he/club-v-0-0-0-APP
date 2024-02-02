import { useState, useEffect } from "react";
import { handleGetData } from "../../../services/api";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import style from "./RefferalCodeInput.module.scss";

export const RefferalCodeInput = ({ value }: any) => {
    const { getStorageItem } = useStorageServices();
    const [referralCode, setReferralCode] = useState("12345");

    useEffect(() => {
        const getRefferalCode = async () => {
            const token = await getStorageItem("token");
            try {
                const data = await handleGetData(
                    "https://lodge-api.aihclubs.com/api/user/referrals",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        getRefferalCode();
    }, []);

    return (
        <div className={style.test}>
            <input type="text" value={referralCode} readOnly />
            <div className={style.copyInput}></div>
        </div>
    );
};
