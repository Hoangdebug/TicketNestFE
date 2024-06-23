interface IEditUserProfileComponentProps extends IBaseCompProps {}

interface IEditUserProfileComponent<P = {}> extends IBaseComp<P> {}

interface IEditUserProfileComponentState extends IBaseCompState {
    description : string;
    name: string;
    Images: string;
}
