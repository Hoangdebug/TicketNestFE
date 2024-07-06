import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface ICustomerRequestPageProps extends IBasePageProps {}

interface ICustomerRequestPage<P = {}> extends IBasePage<P> {}

interface ICustomerRequestPageState {
    customers?: IEditUserProfileDataAPI[];
    ids?: string[];
    total?: number;
}
