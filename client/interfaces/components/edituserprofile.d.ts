interface IEditUserProfileComponentProps extends IBaseCompProps {}

interface IEditUserProfileComponent<P = {}> extends IBaseComp<P> {}

interface IEditUserProfileComponentState {
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    phone?: string;
    address?: string;
    avatar?: string | null;
}
