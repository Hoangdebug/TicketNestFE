import ChangePasswordForm from '../../components/Form/ChangePassword';
import { IChangePasswordPage, IChangePasswordPageProps } from '../../interface/pages/changepassword';
import { images } from '../../utils/Common';

const ChangePasswordPage: IChangePasswordPage<IChangePasswordPageProps> = () => {
  return (
    <div className="pages__changepw d-flex ">
      <div className="pages__changepw-leftSide ">
        <img className="pages__changepw-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className="col-md-6 col-sm-12 pages__changepw-rightSide d-flex flex-column justify-content-center">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
