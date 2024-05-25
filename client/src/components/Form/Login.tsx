import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
  return (
    <div className="components__login">
    <div id="components__login-form">
        <h2>Login</h2>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" required />
            <RemoveRedEyeIcon className='hehe'/>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <p id="error-message" className="error-message text-danger mt-2"></p>
    </div>
</div>
  )
}

export default LoginForm
