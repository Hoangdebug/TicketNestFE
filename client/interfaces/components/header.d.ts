interface IHeaderComponentProps extends IBaseCompProps {
    isShow?: boolean;
    roles?: boolean;
}

interface IHeaderComponent<P = {}> extends IBaseComp<P> {}

interface IHeaderComponentState {
    isOpen?: boolean;
    isActive?: string;
}
