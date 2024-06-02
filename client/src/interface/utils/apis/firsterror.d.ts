interface IFirstErrorDataApi {

}

interface IFirstErrorDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: IFirstErrorDataApi;
}
