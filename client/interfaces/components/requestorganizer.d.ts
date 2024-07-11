interface IRequestOrganizerComponentProps extends IBaseCompProps {}

interface IRequestOrganizerComponent<P = {}> extends IBaseComp<P> {}

interface IRequestOrganizerComponentState {
    organizer?: IRequestOrganizeDataAPI;
}
