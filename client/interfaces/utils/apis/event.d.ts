interface IEventDataApi {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    day_start?: string;
    day_end?: string;
    event_type?: string;
    location?: string;
    price?: string;
    ticket_number?: string;
}

interface IEventDataApiRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi;
}

interface IEventDataApiListRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi[];
}
