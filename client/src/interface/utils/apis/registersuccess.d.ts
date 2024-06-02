interface IRegisterSuccessDataApi {

}

interface IRegisterSuccessDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: IRegisterSuccessDataApi;
}
