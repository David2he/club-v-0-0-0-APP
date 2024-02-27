import style from "./ParrainageCodeLoginChoice.module.scss";
import { ParrainageCodeForm } from "../../Elements/ParrainageCodeForm/ParrainageCodeForm";

export const ParrainageCodeLoginChoice = () => {
    return (
        <div className={style.codeLoginChoiceContainer}>
            <div className={style.orChoiceContainer}>
                <span></span>
                <p>OU</p>
                <span></span>
            </div>
            <p>J'ai un code de parrainage</p>
            <div>
                <ParrainageCodeForm goToUrl="register" loginType="login" />
            </div>
        </div>
    );
};
