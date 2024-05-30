interface ILoginComponentProps extends IBaseCompProps {}

interface ILoginComponent<P = {}> extends IBaseComp<P> {}

interface ILoginComponentState extends IBaseCompState {
    email: string;
    password: string;
}
