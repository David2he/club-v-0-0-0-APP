import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RedirectProps } from "../../types/Types";

export const Redirect: React.FC<RedirectProps> = ({ path }) => {
    const history = useHistory();
    useEffect(() => {
        history.push(path);
    }, [history, path]);

    return null;
};
