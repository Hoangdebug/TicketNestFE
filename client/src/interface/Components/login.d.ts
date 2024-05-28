interface ILoginComponent<P = {}> extends IBaseComp<P>{}

interface ILoginComponentProps extends IBaseCompProps {}

interface ILoginComponentState{ 
    email:? string;
    password:? string;
}