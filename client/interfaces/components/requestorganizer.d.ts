interface IRequestOrganizerComponentProps extends IBaseCompProps {
    organizerRequest?: IEditUserProfileDataAPI;
}

interface IRequestOrganizerComponent<P = {}> extends IBaseComp<P> {}

interface IRequestOrganizerComponentState {
    organizer?: IEditUserProfileDataAPI;
}
