import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IUpdateEventOrganizerPageProps extends IBasePageProps {}

interface IUpdateEventOrganizerPage<P = {}> extends IBasePage<P> {}

interface IUpdateEventOrganizerPageState {
    eventDetails?: IEventDataApi;
}
