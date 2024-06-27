import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { appConfig } from '@utils/configs';
import router from 'next/router';

const axiosConfig = axios.create({
    baseURL: appConfig.API_URL,
});
const handleError = (error: AxiosError) => {
    const { response } = error;
    if (response && response?.status !== http.SUCCESS_CODE) {
        if (response?.status === http.AUTHENTICATION_FAIL_CODE) {
            const isAuthAdmin = authHelper.isAuth();

            if (isAuthAdmin) {
                authHelper.logOut();
                router.replace(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
            }
        }
        return Promise.reject(response);
    }

    return Promise.reject(response);
};

axiosConfig.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        if (authHelper.isAuth()) {
            config.headers = {
                Authorization: authHelper.accessToken(),
            };
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);
axiosConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => handleError(error),
);

axiosConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const { response } = error;
        if (response && response.status !== http.SUCCESS_CODE) {
            return Promise.reject(response);
        }

        return Promise.reject(response);
    },
);

export default axiosConfig;
