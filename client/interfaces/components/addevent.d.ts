interface IAddEventComponent<P = {}> extends IBaseComp<P> {
    eventUpdate?: IEventDataApi;
}

interface IAddEventComponentProps extends IBaseCompProps {}

interface IAddEventComponentState {
    isValidateStartDateTime?: boolean;
    isValidateEndDateTime?: boolean;
    eventAdd?: IEventDataApi;
}
