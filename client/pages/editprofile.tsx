import { EditUserProFileForm } from '@components/index';
import { images } from '@utils/constants';
import { IEditUserProfilePage, IEditUserProfilePageProps } from '@interfaces/pages/edituserprofile';

const EditUserProfilePage: IEditUserProfilePage<IEditUserProfilePageProps> = () => {
    return (
        <div className="pages__login d-flex">
            <div className="pages__login-leftSide">
                <img className="pages__login-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div>
            <div className="col-md-6 col-sm-12 pages__login-rightSide d-flex flex-column justify-content-center">
                <EditUserProFileForm />
            </div>
        </div>
    );
};

export default EditUserProfilePage;
