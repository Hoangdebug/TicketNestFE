import { routes } from '@utils/constants';
import { axios } from '@utils/plugins';
import { AxiosRequestConfig } from 'axios';
import { authHelper } from '.';

const checkAccessTokenAndParams = (data: IAccessTokenAndParams) => {
    const { token, params } = data;

    if (!params && token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    if (params && token) {
        return {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    if (params && !token) {
        return {
            params,
        };
    }

    if (!params && !token) {
        return;
    }
};

export const login = async (data: ILoginDataAPI) => {
    try {
        return await axios.post<ILoginAPIRes>(`${routes.API.LOGIN.href}`, data);
    } catch (err) {
        throw err;
    }
};

export const register = async (data: IRegisterDataApi) => {
    try {
        return await axios.post<IRegisterDataApiRes>(`${routes.API.REGISTER.href}`, data);
    } catch (err) {
        throw err;
    }
};

export const getCurrentUser = async () => {
    try {
        return await axios.get<ICurrentUserAPIRes>(`${routes.API.CURRENT_USER.href}`);
    } catch (err) {
        throw err;
    }
};

export const editUserProfile = async (data: IEditUserProfileDataAPI) => {
    try {
        return await axios.put<IEditUserProfileAPIRes>(`${routes.API.CURRENT_USER.href}`, data);
    } catch (err) {
        throw err;
    }
};

export const uploadImg = async (formData: FormData, config?: AxiosRequestConfig) => {
    try {
        const accessTokenConfig = checkAccessTokenAndParams({ token: authHelper.accessToken() });
        const finalConfig: AxiosRequestConfig = {
            ...accessTokenConfig,
            ...config,
            headers: {
                ...accessTokenConfig?.headers,
                ...config?.headers,
                'Content-Type': 'multipart/form-data',
            },
        };
        return await axios.post<IEditUserProfileAPIRes>(`${routes.API.LOGIN.href}`, formData, finalConfig);
    } catch (err) {
        throw err;
    }
};

export const addEvent = async (data: IEventDataApi) => {
    try {
        return await axios.post<IEventDataApiRes>(`${routes.API.EVENT.href}`, data);
    } catch (err) {
        throw err;
    }
};
export const updateEvent = async (id: string, data: IEventDataApi) => {
    try {
        return await axios.put<IEventDataApiRes>(`${routes.API.EVENT.href}/${id}`, data);
    } catch (err) {
        throw err;
    }
};

export const listEvent = async () => {
    try {
        return await axios.get<IEventDataApiListRes>(`${routes.API.EVENT.href}`);
    } catch (err) {
        throw err;
    }
};

export const listEventOrganizer = async () => {
    try {
        return await axios.get<IEventDataApiListRes>(`${routes.API.ORGANIZER_LIST_EVENT.href}`);
    } catch (err) {
        throw err;
    }
};

export const detailsEvent = async (id: string) => {
    try {
        return await axios.get<IEventDataApiRes>(`${routes.API.EVENT.href}/${id}`);
    } catch (err) {
        throw err;
    }
};

export const requestOrganizer = async (data: IEditUserProfileDataAPI) => {
    try {
        return await axios.put<IEditUserProfileAPIRes>(`${routes.API.REQUEST_ORGANIZER.href}`, { data });
    } catch (err) {
        throw err;
    }
};

export const adminListCustomer = async () => {
    try {
        return await axios.get<IAdminCustomerListAPIRes>(`${routes.API.ADMIN_LIST_CUSTOMER.href}`);
    } catch (err) {
        throw err;
    }
};

export const updateOrganizerByAdmin = async (id: string, data: IEditUserProfileDataAPI) => {
    try {
        return await axios.put<IAdminUpdateOrganizerAPIRes>(`${routes.API.ADMIN_LIST_CUSTOMER.href}/${id}`, data);
    } catch (err) {
        throw err;
    }
};

export const adminBanCustomer = async (id: string) => {
    try {
        return await axios.put<IAdminCustomerBanAPIRes>(`${routes.API.ADMIN_BAN_CUSTOMER.href}/${id}`);
    } catch (err) {
        throw err;
    }
};
