import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IHomePageProps extends IBasePageProps {}

interface IHomePage<P = {}> extends IBasePage<P> {}

interface IHomePageState {
    checkboxChecked: string[];
    radioChecked: string;
}
