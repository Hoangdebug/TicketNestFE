import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="components__login">
      <div className="components__login-form p-4 ">
        <h2 className="fw-bold text-center">Sign in</h2>
        <div className="form-group">
          <label htmlFor="username">Mail</label>
          <input type="text" className="form-control" id="username" name="username" required placeholder="Enter Mail" />
        </div>
        <div className="form-group position-relative">
          <label htmlFor="password">
            Password
            <span className="text-danger">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Enter password"
          />
          {showPassword ? (
          <RemoveRedEyeIcon
            onClick={togglePasswordVisibility}
            sx={{
              top: 30,
              right: 7,
              position: 'absolute',
              cursor: 'pointer',
            }}
          />
        ) : (
          <VisibilityOffIcon
            onClick={togglePasswordVisibility}
            sx={{
              top: 30,
              right: 7,
              position: 'absolute',
              cursor: 'pointer',
            }}
          />
        )}
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div>
            <input className="danger" type="checkbox" />
            <label htmlFor="danger">Remember me</label>
          </div>
          <a href="" className="text-decoration-none">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="components__login-form-firstButton btn btn-primary btn-block">
          Sign in
        </button>
        <button type="submit" className="components__login-form-secondButton">
          <span>Register for a free trial now</span>
        </button>
        <div className='text-center'>Or sign in with</div>
        <button className='components__login-form-thirdButton'>Google</button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
      </div>
    </div>
  );
};

export default LoginForm;
