interface ISeatType2ComponentProps extends IBaseCompProps {}

interface ISeatType2Component<P = {}> extends IBaseComp<P> {}

interface ISeatType2ComponentState {
    rows?: string[];
    numSeatOfRowLeft?: number[];
    numSeatOfRowRight?: number[];
    vipRows?: string[];
    selectedSeat?: string[];
    orderedSeats?: string[];
    ticketPrice?: number;
}
