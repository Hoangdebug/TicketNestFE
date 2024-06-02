interface IRegisterDataApi {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    confirmPassword?: string;
    dob?: string;
}
interface ICurrentUserAPIRes {
    rs?: IRegisterDataApi;
}
interface IRegisterDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: IRegisterDataApi;
}
