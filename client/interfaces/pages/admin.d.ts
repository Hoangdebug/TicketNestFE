import { IBasePage, IBasePageProps } from './base';

interface IAdminPageProps extends IBasePageProps {}

interface IAdminPage<P = {}> extends IBasePage<P> {}

interface IAdminPageState{
    event?: boolean,
    customer?: boolean,
    theater?: boolean,
    settings?: boolean,
}
