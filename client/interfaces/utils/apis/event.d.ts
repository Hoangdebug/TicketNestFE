interface IEventDataApi {}

interface IEventDataApiRes extends IBaseAPIRes {
    code: number;
    mes: string;
    result?: IEventDataApi;
}
