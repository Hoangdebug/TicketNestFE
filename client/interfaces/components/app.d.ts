interface IAppComponentProps extends IBaseCompProps {
    statusCode?: number;
}

interface IAppComponent<P = {}> extends IBaseComp<P> {}

interface IAppComponentState {
    reloadKey?: number;
    historyPathname?: string;
}
