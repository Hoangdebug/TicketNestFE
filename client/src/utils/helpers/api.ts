import { axios } from "../configs"
import { routes } from "../routes"

export const login = async (data: ILoginDataAPI) => {
    try {
       return await axios.post <ILoginDataAPI>(`${routes.API.LOGIN.href}`, data);
    } catch (err) {
        throw err;
    }
}