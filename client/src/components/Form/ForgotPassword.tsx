import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const ForgotPasswordForm: IForgotPasswordComponent<IForgotPasswordComponentProps> = () => {
  const [changeText, setChangeText] = useState();
  return (
    <div className="components__forgotpassword">
      <div className="components__forgotpassword-form p-4 ">
        <h2 className="fw-bold text-center">Forgot Password</h2>
        <div className="text-center">Your password will be reset by email.</div>
        <div className="form-group">
          <label htmlFor="username">Mail</label>
          <input type="text" className="form-control" id="username" name="username" required placeholder="Enter Mail to reset password" />
        </div>
        <button type="submit" className="components__forgotpassword-form-firstButton btn btn-primary btn-block">
          Send
        </button>
        <button type="submit" className="components__forgotpassword-form-secondButton">
          <span>Back to sign in</span>
        </button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
