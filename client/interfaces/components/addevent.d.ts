interface IAddEventComponent<P = {}> extends IBaseComp<P> {}

interface IAddEventComponentProps extends IBaseCompProps {
    eventUpdate?: IEventDataApi;
}

interface IAddEventComponentState {
    isValidateStartDateTime?: boolean;
    isValidateEndDateTime?: boolean;
    eventAdd?: IEventDataApi;
}
