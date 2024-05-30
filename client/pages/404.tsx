import { INotFoundPage, INotFoundPageProps } from '@interfaces/pages/notFound';

const NotFoundPage: INotFoundPage<INotFoundPageProps> = () => {
    return <div className="d-flex justify-content-center">404 NotFound</div>;
};

export default NotFoundPage;
