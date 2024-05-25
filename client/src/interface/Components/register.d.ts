interface IRegisterComponent<P = {}> extends IBaseComp<P>{}

interface IRegisterComponentProps extends IBaseCompProps {}

interface IRegisterComponentState { 
    user?: IRegisterDataApi;
    userName?: string;
}