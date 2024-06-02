import { axios } from "../configs"
import { routes } from "../routes"

export const login = async (data: ILoginDataAPI) => {
    try {
       return await axios.post <ILoginAPIRes>(`${routes.API.LOGIN.href}`, data);
    } catch (err) {
        throw err;
    }
}

export const register = async (data: IRegisterDataApi) => {
    try {
        return await axios.post <IRegisterDataApiRes>(`${routes.API.REGISTER.href}`, data);
    } catch (err) {
        throw err;
    }
}
export const registersuccess = async (data: IRegisterSuccessDataApi) => {
    try {
        return await axios.post <IRegisterSuccessDataApiRes>(`${routes.API.REGISTERSUCCESS.href}`, data);
    } catch (err) {
        throw err;
    }  
}