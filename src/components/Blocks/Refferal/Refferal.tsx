import React from "react";
import style from "./ParrainageCodeLoginChoice.module.scss";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
export const RefferalForm = () => {
    const history = useHistory();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const setRef = (el: any, index: number) => {
        inputRefs.current[index] = el;
    };

    useEffect(() => {
        const inputElements = inputRefs.current;
        const keydownHandlers: ((e: KeyboardEvent) => void)[] = [];
        const inputHandlers: ((e: Event) => void)[] = [];

        inputElements.forEach((ele, index) => {
            if (!ele) return;

            const pasteHandler = async (e: ClipboardEvent) => {
                e.preventDefault();
                let pastedData = e.clipboardData?.getData("text").replace(/\s+/g, "") || "";
                if (pastedData.length >= 1) {
                    pastedData.split("").forEach((char, i) => {
                        // console.log(char, i, inputElements[i]);
                        if (inputElements[i]) {
                            inputElements[i]!.value = char; // Add null check
                            inputElements[i]!.dispatchEvent(new Event("input", { bubbles: true })); // Déclencher manuellement l'événement input
                        }
                    });

                    inputElements[inputElements.length - 1]?.focus();
                }
            };

            const keydownHandler = (e: KeyboardEvent) => {
                if (e.key === "Backspace" && ele.value === "") {
                    inputElements[Math.max(0, index - 1)]?.focus();
                }
            };

            const inputHandler = () => {
                let value = ele.value.replace(/\s+/g, "");
                const [first, ...rest] = Array.from(value);
                ele.value = first ?? "";
                const lastInputBox = index === inputElements.length - 1;
                const didInsertContent = first !== undefined;
                if (didInsertContent && !lastInputBox) {
                    inputElements[index + 1]?.focus();
                    inputElements[index + 1]!.value = rest.join("");
                    inputElements[index + 1]?.dispatchEvent(new Event("input"));
                }
            };
            ele.addEventListener("paste", pasteHandler);
            ele.addEventListener("keydown", keydownHandler);
            ele.addEventListener("input", inputHandler);

            keydownHandlers.push(keydownHandler);
            inputHandlers.push(inputHandler);
        });

        return () => {
            inputElements.forEach((ele, index) => {
                ele?.removeEventListener("input", inputHandlers[index]);
                ele?.removeEventListener("keydown", keydownHandlers[index]);
                ele?.removeEventListener("input", inputHandlers[index]);
            });
        };
    });

    const handleSubmitRefferal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalCode = inputRefs.current.reduce((acc, currentInput) => {
            return acc + (currentInput?.value || "");
        }, "");

        history.push(`/RegisterFormContainer?code=${finalCode}`);
    };
    return (
        <div className={style.codeLoginChoiceContainer}>
            <div className={style.orChoiceContainer}>
                <span></span>
                <p>OU</p>
                <span></span>
            </div>
            <p style={{ marginBottom: 0 }}>J'ai un code de parrainage</p>
            <div>
                <form className={style.formParrainage} onSubmit={handleSubmitRefferal}>
                    <div className={style.inputCodeContainer}>
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                name="code"
                                placeholder="*"
                                required
                                maxLength={1}
                                className="code-input"
                                ref={(el) => setRef(el, index)}
                            />
                        ))}
                    </div>
                    <button type="submit" value="Se connecter" className="submitButton">
                        Créer un compte
                    </button>
                </form>
            </div>
        </div>
    );
};
