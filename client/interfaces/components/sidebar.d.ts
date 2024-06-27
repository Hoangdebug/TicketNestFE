interface ISideBarComponentProps extends IBaseCompProps {}

interface ISideBarComponent<P = {}> extends IBaseComp<P> {}

interface ISideBarComponentState {
    event?: boolean;
    customer?: boolean;
    theater?: boolean;
    settings?: boolean;
    [key: string]: boolean;
}
