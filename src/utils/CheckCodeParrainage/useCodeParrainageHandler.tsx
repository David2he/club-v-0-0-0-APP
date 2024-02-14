import { useRef, useEffect } from "react";
import { Browser } from "@capacitor/browser";
import { useHistory } from "react-router";
import { CodeParrainageType } from "../../types/Types";

export const useCodeParrainageHandler = (
    goToUrl?: string,
    onCodeFetch?: (code: string) => void
): CodeParrainageType => {
    const history = useHistory();
    const currentUrl = new URL(window.location.href);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const codeFromUrl = currentUrl.searchParams.get("code");
    const firstRender = useRef(true);

    if (codeFromUrl && firstRender.current) {
        const codeArray = codeFromUrl.split("");
        inputRefs.current.forEach((input, index) => {
            if (input && codeArray[index]) {
                input.value = codeArray[index];
            }
            firstRender.current = false;
        });
        if (onCodeFetch) {
            onCodeFetch(codeFromUrl);
        }
    }
    const fetchCurrentCode = () => {
        const code = inputRefs.current.map((input) => input?.value).join("");
        return code;
    };
    const getCurrentCode = (onCodeFetch: any) => {
        const handleInputChange = () => {
            const code = inputRefs.current.map((input) => input?.value).join("");

            onCodeFetch(code);
        };

        inputRefs.current.forEach((input) => {
            if (input) {
                input.addEventListener("input", handleInputChange);
            }
        });

        return () => {
            inputRefs.current.forEach((input) => {
                if (input) {
                    input.removeEventListener("input", handleInputChange);
                }
            });
        };
    };

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = inputRefs.current.map((input) => input?.value).join("");
        // const openInBrowser = async (currentUrl: URL) => {
        //     const newUrl = currentUrl.origin + "/RegisterFormContainer";
        //     await Browser.open({
        //         url: `${newUrl}?code=${code}`,
        //     });
        // };

        history.push(`/RegisterFormContainer?code=${code}`);
    };

    useEffect(() => {
        const inputElements = inputRefs.current;
        const keydownHandlers: ((e: KeyboardEvent) => void)[] = [];
        const inputHandlers: ((e: Event) => void)[] = [];
        inputElements.forEach((ele, index) => {
            if (!ele) return;
            const keydownHandler = (e: KeyboardEvent) => {
                if (e.key === "Backspace" && ele.value === "") {
                    inputElements[Math.max(0, index - 1)]?.focus();
                }
            };

            const inputHandler = () => {
                const [first, ...rest] = ele.value;
                ele.value = first ?? "";
                const lastInputBox = index === inputElements.length - 1;
                const didInsertContent = first !== undefined;
                if (didInsertContent && !lastInputBox) {
                    inputElements[index + 1]?.focus();
                    inputElements[index + 1]!.value = rest.join("");
                    inputElements[index + 1]?.dispatchEvent(new Event("input"));
                }
            };

            ele.addEventListener("keydown", keydownHandler);
            ele.addEventListener("input", inputHandler);

            keydownHandlers.push(keydownHandler);
            inputHandlers.push(inputHandler);
        });

        return () => {
            inputElements.forEach((ele, index) => {
                ele?.removeEventListener("keydown", keydownHandlers[index]);
                ele?.removeEventListener("input", inputHandlers[index]);
            });
        };
    });

    return {
        inputRefs,
        onSubmitForm,
        getCurrentCode,
        fetchCurrentCode,
    };
};
