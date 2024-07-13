interface IAddEventComponent<P = {}> extends IBaseComp<P> {}

interface IAddEventComponentProps extends IBaseCompProps {
    event?: IEventDataApi;
}

interface IAddEventComponentState {
    isValidateStartDateTime?: boolean;
    isValidateEndDateTime?: boolean;
    eventAdd?: IEventDataApi;
    previewUrl?: string;
    ids?: string[];
}
