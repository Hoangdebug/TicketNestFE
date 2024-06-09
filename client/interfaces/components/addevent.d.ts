interface IAddEventComponent<P = {}> extends IBaseComp<P> {}

interface IAddEventComponentProps extends IBaseCompProps {}

interface IAddEventComponentState {
    title?: string;
    description?: string;
    banner?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    ticketType?: string;
    ticketPrice?: string;
    supportContact?: string;
    ticketQuantity?: string;
    saleStartDate?: string;
    saleEndDate?: string;
}
