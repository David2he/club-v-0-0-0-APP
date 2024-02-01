import "./ParainageCode.scss";

import { ParraingeFormProps } from "../../../types/Types";
import { useCodeParrainageHandler } from "../../../utils/CheckCodeParrainage/useCodeParrainageHandler";
import { useEffect } from "react";

export const ParrainageCodeForm = ({
    goToUrl,
    loginType,
    onCodeFetch,
}: ParraingeFormProps & React.InputHTMLAttributes<HTMLInputElement>) => {
    const { inputRefs, onSubmitForm, getCurrentCode } = useCodeParrainageHandler(goToUrl, onCodeFetch);

    const setRef = (el: any, index: number) => {
        inputRefs.current[index] = el;
    };

    const renderLogin = () => {
        return (
            <>
                <form onSubmit={onSubmitForm} className='formParrainage'>
                    <div className='inputCodeContainer'>
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                name='code'
                                placeholder='*'
                                required
                                maxLength={1}
                                className='code-input'
                                ref={(el) => setRef(el, index)}
                            />
                        ))}
                    </div>
                    <input type='submit' value="S'enrengistrer" className='submitButton' />
                </form>
            </>
        );
    };

    const renderRegister = () => {
        useEffect(() => {
            if (!onCodeFetch) return;
            const cleanup = getCurrentCode(onCodeFetch);
            return cleanup;
        }, [onCodeFetch]);
        return (
            <>
                <form className='registerFormContainer formParrainage'>
                    <div className='boxFormRegisterContainer'>
                        <p>Code parrainage</p>
                        <div className='inputCodeContainer'>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    name='code'
                                    placeholder='*'
                                    required
                                    maxLength={1}
                                    className='code-input'
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </div>
                </form>
            </>
        );
    };

    return <div>{loginType === "register" ? renderRegister() : renderLogin()}</div>;
};
