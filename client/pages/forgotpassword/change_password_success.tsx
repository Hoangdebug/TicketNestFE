import ChangePasswordSuccessForm from '@components/forms/ChangePasswordSuccess';
import { IChangePasswordSuccessPage, IChangePasswordSuccessPageProps } from '@interfaces/pages/changepasswordsuccess';

import { images } from '@utils/constants';

const ChangePasswordSuccessPage: IChangePasswordSuccessPage<IChangePasswordSuccessPageProps> = () => {
    return (
        <div className="pages__changepwsuccess d-flex ">
            <div className="pages__changepwsuccess-leftSide ">
                <img className="pages__changepwsuccess-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div>
            <div className="col-md-6 col-sm-12 pages__changepwsuccess-rightSide d-flex flex-column justify-content-center">
                <ChangePasswordSuccessForm />
            </div>
        </div>
    );
};

export default ChangePasswordSuccessPage;
