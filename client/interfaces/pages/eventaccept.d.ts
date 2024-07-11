import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IEventManagerAcceptPageProps extends IBasePageProps {}

interface IEventManagerAcceptPage<P = {}> extends IBasePage<P> {}

interface IEventManagerAcceptPageState {
    event?: IEventDataApi[];
    eventDetails?: IEventDataApi;
    totalItems?: number;
    pages?: number;
    ids?: string[];
    status?: string;
}
