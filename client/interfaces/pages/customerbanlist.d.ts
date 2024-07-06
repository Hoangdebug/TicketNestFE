import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IAdminCustomerBanPageProps extends IBasePageProps {}

interface IAdminCustomerBanPage<P = {}> extends IBasePage<P> {}

interface IAdminCustomerBanPageState {
    customers?: IEditUserProfileDataAPI[];
    ids?: string[];
    total?: number;
}
