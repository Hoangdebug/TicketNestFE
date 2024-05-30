import RegisterForm from '@components/forms/Register';
import { IRegisterPage, IRegisterPageProps } from '@interfaces/pages/register';

import { images } from '@utils/constants';

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
    );
};

export default RegisterPage;
