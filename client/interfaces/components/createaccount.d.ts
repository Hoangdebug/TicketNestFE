interface ICreateAccountComponent<P = {}> extends IBaseComp<P> {}

interface ICreateAccountComponentProps extends IBaseCompProps {
    account?: IAccountDataApi;
}

interface ICreateAccountComponentState {
    accountAdd?: IAccountDataApi;
}
