interface ISeatType1ComponentProps extends IBaseCompProps {}

interface ISeatType1Component<P = {}> extends IBaseComp<P> {}

interface ISeatType1ComponentState {
    rows?: string[];
    numSeatOfRowLeft?: number[];
    numSeatOfRowRight?: number[];
    vipRows?: string[];
    selectedSeat?: string | null;
    orderedSeats?: string[];
    ticketPrice?: number;
}
