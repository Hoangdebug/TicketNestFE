interface IEventDataApi {
    id?: string;
    name?: string;
}

interface IEventDataApiRes extends IBaseAPIRes {
    code: number;
    mes: string;
    result?: IEventDataApi;
}

interface IEventDataApiListRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi[];
}
