interface IEditUserProfileComponentProps extends IBaseCompProps {
    currentUser?: IEditUserProfileDataAPI;
}

interface IEditUserProfileComponent<P = {}> extends IBaseComp<P> {}

interface IEditUserProfileComponentState {
    curentProfile?: IEditUserProfileDataAPI;
    previewUrl?: string;
}
