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
    created_by?: {
        _id?: string;
        name?: string;
        description?: string;
        contact_email?: string;
        contact_phone?: string;
        sponsor_by?: string;
    };
}

interface IEventDataApiRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi;
}

interface IEventByOrganizerDataApiRes extends IBaseAPIRes {
    code: number;
    result?: IEventDataApi[];
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
