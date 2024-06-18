interface IEventListComponentProps extends IBaseCompProps {}

interface IEventListComponent<P = {}> extends IBaseComp<P> {}

interface IEventListComponentState {
    type?: 'All' | 'Music' | 'Dramatic' | 'Work Shop' | undefined;
    isActive?: boolean;
}
