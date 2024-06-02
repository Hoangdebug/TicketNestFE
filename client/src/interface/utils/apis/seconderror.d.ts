interface ISecondErrorDataApi {

}

interface ISecondErrorDataApiRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: ISecondErrorDataApi;
}
