import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createRef, useState } from 'react';
import Validator from '../Common/Validator';
import { validateHelper } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

const ChangePasswordForm: IChangePasswordComponent<IChangePasswordComponentProps> = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleReNewPasswordVisibility = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(routes.CLIENT.LOGIN_PAGE.href);
  };

  const handleNextPage = () => {
    navigate(routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href);
  };

  const [state, setState] = useState<IChangePasswordComponentState>({
    newPassword: '',
    reNewPassword: ''
  });

  const { newPassword, reNewPassword } = state;

  const newPasswordValidatorRef = createRef<IValidatorComponentHandle>();
  const reNewPasswordValidatorRef = createRef<IValidatorComponentHandle>();

  const handleOnChange = (feild: string, value: string | null) => {
    setState((prev) => ({
      ...prev,
      [feild]: value
    }));
  };

  const submitForm = async () => {
    let isValidate = true;

    const validatorText = [
      { ref: newPasswordValidatorRef, value: newPassword, message: 'Your New Password Is Not Empty!' },
      { ref: reNewPasswordValidatorRef, value: reNewPassword, message: 'Your Re New Password Is Not Empty!' }
    ];

    validatorText.forEach(({ ref, value, message }) => {
      ref.current?.onValidateMessage('');
      if (validateHelper.isEmpty(value ?? '')) {
        ref.current?.onValidateMessage(message);
        isValidate = false;
      } else if (validateHelper.isCharacters(value ?? '')) {
        ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
        isValidate = false;
      }
    });

    if (reNewPassword !== newPassword) {
      reNewPasswordValidatorRef.current?.onValidateMessage('New Password And Re New Password Is Not Same. Please Enter Again');
      isValidate = false;
    }

    // call api
    if (isValidate) {
      // logic call api
    }
  };
  return (
    <div className="components__changepw">
      <div className="components__changepw-form p-4 ">
        <h2 className="fw-bold text-center">Change Password</h2>
        <div className="form-group position-relative">
          <label htmlFor="password">
            New Password
            {/* <span className="text-danger">*</span> */}
          </label>
          <Validator ref={newPasswordValidatorRef}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              name="password"
              value={newPassword ?? ''}
              onChange={(e) => handleOnChange('newPassword', e.target.value)}
              required
              placeholder="Enter new password"
            />
          </Validator>
          {showNewPassword ? (
            <RemoveRedEyeIcon
              onClick={toggleNewPasswordVisibility}
              sx={{
                top: 30,
                right: 7,
                position: 'absolute',
                cursor: 'pointer'
              }}
            />
          ) : (
            <VisibilityOffIcon
              onClick={toggleNewPasswordVisibility}
              sx={{
                top: 30,
                right: 7,
                position: 'absolute',
                cursor: 'pointer'
              }}
            />
          )}
        </div>
        <div className="form-group position-relative">
          <label htmlFor="password">
            Re New Password
            {/* <span className="text-danger">*</span> */}
          </label>
          <Validator ref={reNewPasswordValidatorRef}>
            <input
              type={showReNewPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              name="password"
              value={reNewPassword ?? ''}
              onChange={(e) => handleOnChange('reNewPassword', e.target.value)}
              required
              placeholder="Re enter new password"
            />
          </Validator>
          {showReNewPassword ? (
            <RemoveRedEyeIcon
              onClick={toggleReNewPasswordVisibility}
              sx={{
                top: 30,
                right: 7,
                position: 'absolute',
                cursor: 'pointer'
              }}
            />
          ) : (
            <VisibilityOffIcon
              onClick={toggleReNewPasswordVisibility}
              sx={{
                top: 30,
                right: 7,
                position: 'absolute',
                cursor: 'pointer'
              }}
            />
          )}
        </div>
        <button type="submit" onClick={submitForm} className="components__changepw-form-firstButton btn btn-primary btn-block">
          Change Password
        </button>
        <button type="submit" onClick={handlePrevPage} className="components__changepw-form-secondButton">
          <span>Back to sign in</span>
        </button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
