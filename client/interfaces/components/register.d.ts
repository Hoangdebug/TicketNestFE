interface IRegisterComponent<P = {}> extends IBaseComp<P> {}

interface IRegisterComponentProps extends IBaseCompProps {}

interface IRegisterComponentState {
    username?: string;
    email?: string;
    phone?: string;
    dob?: string;
    password?: string;
    confirmPassword?: string;
}
