import ForgotPasswordForm from '../../components/Form/ForgotPassword';
import { IForgotPasswordPage, IForgotPasswordPageProps } from '../../interface/pages/forgotpassword';
import { images } from '../../utils/Common';

const ForgotPasswordPage: IForgotPasswordPage<IForgotPasswordPageProps> = () => {
  return (
    <div className="pages__forgotpassword d-flex ">
      <div className="col-12 col-md-6 pages__forgotpassword-leftSide ">
        <img className="pages__forgotpassword-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className="col-12 col-md-6 pages__forgotpassword-rightSide d-flex flex-column justify-content-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
