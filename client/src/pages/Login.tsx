import LoginForm from '../components/Form/Login'
import { ILoginPage, ILoginPageProps } from '../interface/pages/login'

const LoginPage: ILoginPage<ILoginPageProps> = () => {
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default LoginPage
