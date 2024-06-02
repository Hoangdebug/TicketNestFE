interface IThirdErrorDataApi {

}

interface IThirdErrorDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: IThirdErrorDataApi;
}
