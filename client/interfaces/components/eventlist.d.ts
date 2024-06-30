interface IEventListComponentProps extends IBaseCompProps {
    dataEvent?: IEventDataApi[];
}

interface IEventListComponent<P = {}> extends IBaseComp<P> {}

interface IEventListComponentState {
    type?: 'All' | 'Music' | 'Dramatic' | 'Work Shop' | undefined;
    isActive?: boolean;
}
