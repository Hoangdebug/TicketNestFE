import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface INotFoundPageProps extends IBasePageProps {
    statusCode?: number;
}

interface INotFoundPage<P = {}> extends IBasePage<P> {}
