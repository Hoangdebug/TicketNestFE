import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
  return (
    <div className="components__login">
    <div className="components__login-form p-4 ">
        <h2 className='fw-bold text-center'>Sign in</h2>
        <div className="form-group">
            <label htmlFor="username">Mail</label>
            <input type="text" className="form-control" id="username" name="username" required placeholder='Enter Mail'/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password
            <span className='text-danger'>*</span>
            </label>
            <input type="password" className="form-control" id="password" name="password" required placeholder='Enter password'/>
            <RemoveRedEyeIcon className='hehe'/>
        </div>
        <div className='d-flex flex-row'>
          <input id="danger" type="checkbox" />
          <label htmlFor="danger">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
    </div>
</div>
  )
}

export default LoginForm
