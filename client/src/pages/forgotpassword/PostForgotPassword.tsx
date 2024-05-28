import PostForgotPasswordForm from '../../components/Form/PostForgotPassword';
import { IPostForgotPasswordPage, IPostForgotPasswordPageProps } from '../../interface/pages/postforgotpassword';
import { images } from '../../utils/Common';

const PostForgotPasswordPage: IPostForgotPasswordPage<IPostForgotPasswordPageProps> = () => {
  return (
    <div className="pages__postForgotPassword d-flex ">
      <div className="col-12 col-md-6 pages__postForgotPassword-leftSide ">
        <img className="pages__postForgotPassword-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
      </div>
      {/* <div className="col-12 col-md-6 pages__postForgotPassword-rightSide d-flex flex-column justify-content-center">
        <PostForgotPasswordForm />
      </div> */}
      <div className="col-12 col-md-6 pages__postForgotPassword-rightSide ">
        <img className="pages__postForgotPassword-rightSide-logo" style={{ height: '100vh'}} src={images.POSTFORGOTPW_LOGO} alt="" />
      </div>
    </div>
  );
};

export default PostForgotPasswordPage;
