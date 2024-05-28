import RegisterForm from "../components/Form/Register"
import { IRegisterPage, IRegisterPageProps } from "../interface/pages/register"
import { images } from '../utils/Common'

const RegisterPage: IRegisterPage<IRegisterPageProps> = () => {
  return (
    <div className="pages__register">
      <div className="col-md-6 pages__register-leftside">
        <img style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className="col-md-6 pages__register-rightside d-flex flex-column justify-content-center">
        <RegisterForm />
      </div>
    </div>

  )
}

export default RegisterPage
