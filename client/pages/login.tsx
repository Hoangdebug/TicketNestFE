import { LoginForm } from '@components/index';
import { images } from '@utils/constants';
import { ILoginPage, ILoginPageProps } from '@interfaces/pages/login';

const LoginPage: ILoginPage<ILoginPageProps> = () => {
    return (
        <div className="pages__login d-flex">
            <div className="pages__login-leftSide">
                <img className="pages__login-leftSide-logo" style={{ height: '100vh' }} src={images.LOGIN_LOGO} alt="" />
            </div>
            <div className="col-md-6 col-sm-12 pages__login-rightSide d-flex flex-column justify-content-center">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
