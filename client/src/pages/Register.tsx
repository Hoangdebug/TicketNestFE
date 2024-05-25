import RegisterForm from "../components/Form/Register"
import { IRegisterPage, IRegisterPageProps } from "../interface/pages/register"
import { images } from '../utils/Common'

const RegisterPage: IRegisterPage<IRegisterPageProps> = () => {
  return (
    <div className="pages__register">
      <div className="col-md-6 pages__register-leftside">
        <img height="100%" src={images.LOGIN_LOGO} alt="" />
      </div>
      <div className="col-md-6 pages__register-rightside">
        <RegisterForm />
      </div>
    </div>

  )
}

export default RegisterPage
