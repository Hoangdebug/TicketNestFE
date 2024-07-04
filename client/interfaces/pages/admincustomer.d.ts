import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IAdminCustomerPageProps extends IBasePageProps {}

interface IAdminCustomerPage<P = {}> extends IBasePage<P> {}

interface IAdminCustomerPageState {
    customers?: IEditUserProfileDataAPI[];
}
