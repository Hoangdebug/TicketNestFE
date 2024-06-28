import { RequestOrganizerForm } from '@components/index';
import { images } from '@utils/constants';
import { IRequestOrganizePage, IRequestOrganizePageProps } from '@interfaces/pages/requestorganize';

const RequestOrganizePage: IRequestOrganizePage<IRequestOrganizePageProps> = () => {
    return (
        <div className="pages__login d-flex">
            <div className="pages__login-leftSide">
                <img className="pages__login-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div>
            <div className="col-md-6 col-sm-12 pages__login-rightSide d-flex flex-column justify-content-center">
                <RequestOrganizerForm />
            </div>
        </div>
    );
};

export default RequestOrganizePage;
