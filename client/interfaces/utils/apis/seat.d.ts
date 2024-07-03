interface ISeatType1DataAPI {
    rows?: string;
    numSeatOfRow?: string;
}

interface ISeatType1APIRes extends IBaseAPIRes {
    code: number;
    mes: string;
    data?: {
        seatData: ISeatType1DataAPI;
    };
}
