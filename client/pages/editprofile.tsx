import { EditUserProFileForm } from '@components/index';
import { images } from '@utils/constants';
import { IEditUserProfilePage, IEditUserProfilePageProps } from '@interfaces/pages/edituserprofile';
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

const EditUserProfilePage: IEditUserProfilePage<IEditUserProfilePageProps> = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    console.log(profile);
    return (
        <div className="pages__login d-flex">
            <div className="pages__login-leftSide">
                <img className="pages__login-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div>
            {Object.keys(profile).length > 0 && (
                <div className="col-md-6 col-sm-12 pages__login-rightSide d-flex flex-column justify-content-center">
                    <EditUserProFileForm currentUser={profile} />
                </div>
            )}
        </div>
    );
};

export default EditUserProfilePage;
