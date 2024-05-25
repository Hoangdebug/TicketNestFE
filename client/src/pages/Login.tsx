import LoginForm from '../components/Form/Login'
import { ILoginPage, ILoginPageProps } from '../interface/pages/login'
import { images } from '../utils/Common'

const LoginPage: ILoginPage<ILoginPageProps> = () => {
  return (
    <div className='row pages__login'>
      <div className='col-md-6 pages__login-leftSide'>
        <img src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className='col-md-6 pages__login-rightSide'>
      <LoginForm />
      </div>
        
    </div>
  )
}

export default LoginPage
