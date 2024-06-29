interface IBaseAPIRes {
    code?: number;
    mes?: string;
}

interface IErrorAPIRes extends IBaseAPIRes {}

interface IAccessTokenAndParams {
    token?: string;
    params?: IListParams;
}
