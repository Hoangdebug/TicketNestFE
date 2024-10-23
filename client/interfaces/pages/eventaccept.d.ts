import { IBasePageProps, IBasePage } from '@interfaces/pages/base';
import { enums } from '@utils/constants';

interface IEventManagerAcceptPageProps extends IBasePageProps {}

interface IEventManagerAcceptPage<P = {}> extends IBasePage<P> {}

interface IEventManagerAcceptPageState {
    event?: IEventDataApi[];
    allEvents?: IEventDataApi[];
    eventDetails?: IEventDataApi;
    totalItems?: number;
    pages?: number;
    ids?: string[];
    status?: 'all' | enums.EventStatus.ACCEPTED | enums.EventStatus.CANCELLED | enums.EventStatus.PENDING | undefined;
    search?: string;
    currentPage?: number;
    statusEvent?: string;
    statusEventFilter?: string;
    totalPage?: number;
}
