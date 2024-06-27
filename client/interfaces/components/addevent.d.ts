interface IAddEventComponent<P = {}> extends IBaseComp<P> {}

interface IAddEventComponentProps extends IBaseCompProps {}

interface IAddEventComponentState {
    isValidateStartDateTime?: boolean;
    isValidateEndDateTime?: boolean;
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
}
