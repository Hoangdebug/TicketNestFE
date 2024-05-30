import ForgotPasswordForm from '../../components/Form/ForgotPassword';
import { IForgotPasswordPage, IForgotPasswordPageProps } from '../../interface/pages/forgotpassword';
import { images } from '../../utils/Common';

const ForgotPasswordPage: IForgotPasswordPage<IForgotPasswordPageProps> = () => {
  return (
    <div className="pages__forgotpw d-flex ">
      <div className="pages__forgotpw-leftSide ">
        <img className="pages__forgotpw-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className="col-md-6 col-sm-12 pages__forgotpw-rightSide d-flex flex-column justify-content-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
