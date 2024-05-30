import { images } from '../../utils/Common';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

const ChangePasswordSuccessForm: IChangePasswordSuccessComponent<IChangePasswordSuccessComponentProps> = () => {
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(routes.CLIENT.LOGIN_PAGE.href);
  };

  return (
    <div className="components__changepwsuccess">
      <div className="components__changepwsuccess-form p-4 ">
        <h2 className="fw-bold text-center">Your password has been changed</h2>
        <button type="submit" onClick={handlePrevPage} className="components__changepwsuccess-form-secondButton">
          <span>Back to sign in</span>
        </button>

        <img className="pages__changepwsuccess-form-logo" style={{ height: '70vh' }} src={images.CHANGEPWSUCCESS_LOGO} alt="" />
      </div>
    </div>
  );
};

export default ChangePasswordSuccessForm;
