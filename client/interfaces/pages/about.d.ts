import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IAboutPageProps extends IBasePageProps {}

interface IAboutPage<P = {}> extends IBasePage<P> {}

interface IAboutPageState {
    checkboxChecked: string[];
    radioChecked: string;
}
