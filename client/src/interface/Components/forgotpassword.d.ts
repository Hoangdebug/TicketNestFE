interface IForgotPasswordComponent<P = {}> extends IBaseComp<P>{}

interface IForgotPasswordComponentProps extends IBaseCompProps {}

interface IForgotPasswordComponentState{ 
    email:? string;
}