interface IRequestOrganizerComponentProps extends IBaseCompProps {}

interface IRequestOrganizerComponent<P = {}> extends IBaseComp<P> {}

interface IRequestOrganizerComponentState {
    organizationName?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
    status?: string;
    Images?: string | null;
}
