interface IEditUserProfileComponentProps extends IBaseCompProps {}

interface IEditUserProfileComponent<P = {}> extends IBaseComp<P> {}

interface IEditUserProfileComponentState extends IBaseCompState {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    phone : string;
    address: string;
}
