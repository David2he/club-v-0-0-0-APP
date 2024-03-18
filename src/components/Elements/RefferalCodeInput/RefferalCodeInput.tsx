import { useState, useEffect } from "react";
import { handleGetData } from "../../../services/api";
import { useStorageServices } from "../../../services/storages/useStorageServices";
import { Input } from "../../../components/Elements/Input/Input";
import style from "./RefferalCodeInput.module.scss";

export const RefferalCodeInput = () => {
  const { getStorageItem } = useStorageServices();
  const [referralCode, setReferralCode] = useState([]);
  const [copiedSelectedCode, setCopiedSelectedCode] = "";

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

        const newReferrals = response.data.filter(
          (element: any) => element.status === "new"
        );
        setReferralCode(newReferrals);
      } catch (error) {
        console.log(error);
      }
    };
    getRefferalCode();
  }, []);

  const copyToClipboard = async (selectedNonce: string) => {
    try {
      await navigator.clipboard.writeText(selectedNonce);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={style.inputContainer}>
      {referralCode.map((item: any) => {
        return (
          <div key={item.nonce} className={style.insideInputContainer}>
            <Input
              iconURL={"assets/iconInput/refferal.svg"}
              altIcon={"iconLock"}
              placeholder={"+33 6 43 ......"}
              labelType={"phone"}
              name="phone"
              value={item.nonce}
              type="classic"
            />
            <div className={style.copyInput}></div>
            <button
              onClick={() => {
                copyToClipboard(item.nonce);
              }}
              className={style.copyButton}
            >
              Copier le code
            </button>
          </div>
        );
      })}

      <p>Vous pouvez faire profiter de ce code unique à l'un de vos contacts</p>
      {/* <p>Envoyer lui votre code</p> */}
    </div>
  );
};
