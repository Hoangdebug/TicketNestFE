interface ISeatType3ComponentProps extends IBaseCompProps {}

interface ISeatType3Component<P = {}> extends IBaseComp<P> {}

interface ISeatType3ComponentState {
    rows?: string[];
    numSeatOfRow?: number[];    
    vipRows?: string[];
    selectedSeat?: string[];
    orderedSeats?: string[];
    ticketPrice?: number;
}
