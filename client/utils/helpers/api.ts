import { routes } from '@utils/constants';
import { axios } from '@utils/plugins';

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
