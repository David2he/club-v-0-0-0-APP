import axios from "axios";

export const handleGetData = async (url: string, options?: any): Promise<any> => {
    const response = await axios.get(url, {
        headers: options.headers,
    });
    return response;
};

export const handlePostData = async (url: string, options: any): Promise<any> => {
    const response = await axios.post(url, options.body, {
        headers: options.headers,
    });

    return response;
};

export const handlePatchData = async (url: string, options: any): Promise<any> => {
    const response = await axios.patch(url, options.body, {
        headers: options.headers,
    });

    return response;
};
