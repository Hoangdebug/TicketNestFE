interface ISeatType1ComponentProps extends IBaseCompProps {}

interface ISeatType1Component<P = {}> extends IBaseComp<P> {}

interface ISeatType1ComponentState {
    rows?: string[];
    numSeats?: number[];
    vipRows?: string[];
    selectedSeat?: string[];
    orderedSeats?: string[];
    ticketPrice?: number;
}
