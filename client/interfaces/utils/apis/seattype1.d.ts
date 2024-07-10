interface ISeatType1DataAPI {
    rows?: string[];
    numSeatOfRowLeft?: number[];
    numSeatOfRowRight?: number[];
    vipRows?: string[];
    selectedSeat?: string | null;
    orderedSeats?: string[];
    ticketPrice?: number;
}

interface ICurrentSeatType1APIRes {
    result?: ISeatType1DataAPI;
}
interface ISeatType1DataAPIRes extends IBaseAPIRes {
    code?: number;
    message?: string;
    result?: ISeatType1DataAPI;
}
