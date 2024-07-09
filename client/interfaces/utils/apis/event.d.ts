interface IEventDataApi {
    _id?: string;
    name?: string;
    description?: string;
    image?: string;
    day_start?: string;
    day_end?: string;
    event_type?: string;
    location?: string;
    price?: number;
    ticket_number?: string;
}

interface IEventDataApiRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi;
}

interface IEventDataApiListRes extends IBaseAPIRes {
    code: number;
    result?: {
        metadata?: {
            pages?: number;
            pageSize?: number;
            currentPage?: number;
            totalItems?: number;
        };
        dataEvent?: IEventDataApi[];
    };
}
