import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const ChangePasswordForm: IChangePasswordComponent<IChangePasswordComponentProps> = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleReNewPasswordVisibility = () => {
    setShowReNewPassword(!showReNewPassword);
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
          <input
            type={showNewPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Enter new password"
          />
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
          <input
            type={showReNewPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Re enter new password"
          />
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
        <button type="submit" className="components__login-form-firstButton btn btn-primary btn-block">
          Change Password
        </button>
        <button type="submit" className="components__login-form-secondButton">
          <span>Back to sign in</span>
        </button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
