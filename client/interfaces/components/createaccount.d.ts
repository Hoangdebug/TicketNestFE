interface ICreateAccountComponent<P = {}> extends IBaseComp<P> {}

interface ICreateAccountComponentProps extends IBaseCompProps {}

interface ICreateAccountComponentState {
    email?: string;
    password?: string;
    role?: string;
    username?: string;
}
