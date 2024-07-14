interface IChangePasswordComponent<P = {}> extends IBaseComp<P> {}

interface IChangePasswordComponentProps extends IBaseCompProps {}

interface IChangePasswordComponentState {
    email: string;
    otp: string | undefined;
    newPassword: string | undefined;
    reNewPassword: ?(string | undefined);
}
