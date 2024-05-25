import RegisterForm from "../components/Form/Register"
import { IRegisterPage, IRegisterPageProps } from "../interface/pages/register"


const RegisterPage: IRegisterPage<IRegisterPageProps> = () => {
  return (
    <div>
        <RegisterForm />
    </div>
  )
}

export default RegisterPage
