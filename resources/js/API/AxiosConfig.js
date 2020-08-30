import axios from 'axios';
// import SnackbarUtil from "./components/SnackbarUtil/SnackbarUtil";

export const tokenTitle = 'token';
const baseURL = `/api/v1`;

const axiosDefaultConfigs = {
    baseURL: baseURL,
};

const createAxiosConfig = (axiosDefaultConfig) => {
    const token = localStorage.getItem(tokenTitle);

    if (token) {
        return {
            ...axiosDefaultConfig,
            headers: {
                ...axiosDefaultConfig.headers,
                Authorization: `Bearer ${token}`,
            },
        };
    }

    return { ...axiosDefaultConfig };
};

const axiosInstance = axios.create(createAxiosConfig(axiosDefaultConfigs));

// export const deleteAxiosInstanceHeaders = (headerName: string) => {
//     delete axiosInstance.defaults.headers[headerName];
// };

// to check if a request needs authorization,
// we need to specify routes who needs authorization
// manually in an array (`needPermission`) and then
// check in Axios interceptors for urls needing
// that. if these urls have Authorization header
// then we go on making those request else we drop those
// requests

// const needPermission = [{ url: '/panel', exact: false }];
//
// const reqNeedsPermission = (url : string) => needPermission.some((item) => (
//     item.exact ? url === item.url : url.includes(item.url)));
//
// axiosInstance.interceptors.request.use((request : AxiosRequestConfig) => {
//     if (request.url && reqNeedsPermission(request.url)) {
//         if (!request.headers.Authorization) {
//             throw new axios.Cancel('no-default-auth');
//         }
//     }
//     return request;
// }, (error : AxiosError) => Promise.reject(error));
//
// axiosInstance.interceptors.response.use((response) => response, (error) => {
//     let msg = 'error';
//     if (error.response) {
//         if (error.response.data) {
//             if (typeof error.response.data.message === 'string') {
//                 msg = error.response.data.message;
//             } else if (error.response.data.error) {
//                 msg = error.response.data.error;
//             }
//         }
//     } else if (error.message) {
//         msg = error.message;
//     }
//     if (msg === 'no-default-auth') {
//         return Promise.reject(error);
//     }
//     SnackbarUtil.error(msg);
//     return Promise.reject(error);
// });

export default axiosInstance;
