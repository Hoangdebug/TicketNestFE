import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createRef, useState } from 'react';
import Validator from '../Common/Validator';
import { validateHelper } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

const ForgotPasswordForm: IForgotPasswordComponent<IForgotPasswordComponentProps> = () => {
  const [changeText, setChangeText] = useState();
  const navigate = useNavigate();

  const handlePrevPage = () => {
    navigate(routes.CLIENT.LOGIN_PAGE.href);
  };

  const handleNextPage = () => {
    navigate(routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href);
  };

  const [state, setState] = useState<IForgotPasswordComponentState>({
    email: ''
  });

  const { email } = state;

  const emailValidatorRef = createRef<IValidatorComponentHandle>();

  const handleOnChange = (feild: string, value: string | null) => {
    setState((prev) => ({
      ...prev,
      [feild]: value
    }));
  };

  const submitForm = async () => {
    let isValidate = true;

    const validatorText = [{ ref: emailValidatorRef, value: email, message: 'Your Mail Is Not Empty!' }];

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

    // call api
    if (isValidate) {
      // logic call api
    }
  };

  return (
    <div className="components__forgotpw">
      <div className="components__forgotpw-form p-4 ">
        <h2 className="fw-bold text-center">Forgot Password</h2>
        <div className="text-center">Your password will be reset by email.</div>
        <div className="form-group">
          <label htmlFor="username">Mail</label>
          <Validator ref={emailValidatorRef}>
            <input
              type="email"
              className="form-control"
              id="username"
              name="username"
              value={email ?? ''}
              onChange={(e) => handleOnChange('email', e.target.value)}
              required
              placeholder="Enter Mail to reset password"
            />
          </Validator>
        </div>
        <button type="submit" onClick={submitForm} className="components__forgotpw-form-firstButton btn btn-primary btn-block">
          Send
        </button>
        <button type="submit" onClick={handlePrevPage} className="components__forgotpw-form-secondButton">
          <span>Back to sign in</span>
        </button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
