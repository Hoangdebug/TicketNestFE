import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IOrderPageProps extends IBasePageProps {}

interface IOrderPage<P = {}> extends IBasePage<P> {}

interface IOrderPageState {
    order?: IOrderDataApi;
}
