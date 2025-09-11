import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({});

interface RequestHeaders {
    [key: string]: string;
}

interface RequestParams {
    [key: string]: string | number | boolean;
}

interface RequestBody {
    [key: string]: unknown;
}

const apiConnector = (
    method: string,
    url: string,
    body?: RequestBody | FormData,
    header?: RequestHeaders,
    param?: RequestParams
): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data: body ?? null,
        headers: header ?? undefined,
        params: param ?? undefined,
    };

    return axiosInstance(config);
};

export default apiConnector;