import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IEventListPageProps extends IBasePageProps {}

interface IEventListPage<P = {}> extends IBasePage<P> {}

interface IEventListPageState {
    events?: IEventDataApi[];
}
