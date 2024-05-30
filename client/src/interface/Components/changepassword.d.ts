interface IChangePasswordComponent<P = {}> extends IBaseComp<P>{}

interface IChangePasswordComponentProps extends IBaseCompProps {}

interface IChangePasswordComponentState{ 
    newPassword:? string;
    reNewPassword:? string;
}