interface IOtpVerifyComponent<P = {}> extends IBaseComp<P> {}

interface IOtpVerifyComponentProps extends IBaseCompProps {}

interface IOtpVerifyComponentState {
    email: string;
    otp?: string;
    newPassword?: string;
}
