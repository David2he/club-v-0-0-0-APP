import { useState, useEffect } from "react";
import { handleGetData } from "../../../services/api";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import style from "./RefferalCodeInput.module.scss";

export const RefferalCodeInput = () => {
    const { getStorageItem } = useStorageServices();
    const [referralCode, setReferralCode] = useState("12345");

    useEffect(() => {
        const getRefferalCode = async () => {
            const token = await getStorageItem("token");
            try {
                const response = await handleGetData(
                    "https://lodge-api.aihclubs.com/api/user/referrals",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setReferralCode(response.data[0].nonce);
            } catch (error) {
                console.log(error);
            }
        };
        getRefferalCode();
    }, []);

    const copyToClipboard = async (e) => {
        try {
            await navigator.clipboard.writeText(referralCode);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className={style.inputContainer}>
            <input type="text" value={referralCode} readOnly />
            <div className={style.copyInput}></div>
            <button onClick={copyToClipboard} className={style.copyButton}>
                Copier le code
            </button>
            <p>Vous pouvez faire profiter de ce code unique a l'un de vos contact</p>
            <p>Envoyer lui votre code</p>
        </div>
    );
};
