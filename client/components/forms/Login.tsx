import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createRef, useState } from 'react';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import { routes } from '@utils/constants';
import router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@redux/actions';

const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState<ILoginComponentState>({
        email: '',
        password: '',
    });
    const handleNextPage = () => {
        navigate.push(routes.CLIENT.REGISTER_PAGE.href);
    };
    const { email, password } = state;

    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [
            { ref: emailValidatorRef, value: email, message: 'Your Mail Is Not Empty!' },
            { ref: passwordValidatorRef, value: password, message: 'Your Password Is Not Empty!' },
        ];

        validatorText.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(value ?? '')) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(value ?? '')) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });

        // call api
        if (isValidate) {
            dispatch(await fetchLogin({email, password} , (res) => {
                if(res?.code == 200){
                    router.push(routes.CLIENT.HOME_PAGE.href);
                }else if (res?.code == 400){ 
                    alert(res?.message);
                }
            }))
        }
    };
    return (
        <div className="components__login">
            <div className="components__login-form p-4 ">
                <h2 className="fw-bold text-center">Sign in</h2>
                <div className="form-group">
                    <label htmlFor="username">Mail</label>
                    <Validator ref={emailValidatorRef}>
                        <input
                            type="email"
                            className="form-control"
                            id="username"
                            name="username"
                            value={email ?? ''}
                            onChange={(e) => handleOnChange('email', e.target.value)}
                            placeholder="Enter Mail"
                        />
                    </Validator>
                </div>
                <div className="form-group position-relative">
                    <label htmlFor="password">
                        Password
                        <span className="text-danger">*</span>
                    </label>
                    <Validator ref={passwordValidatorRef}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={password ?? ''}
                            onChange={(e) => handleOnChange('password', e.target.value)}
                            placeholder="Enter password"
                        />
                    </Validator>
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
                <button type="submit" onClick={submitForm} className="components__login-form-firstButton btn btn-primary btn-block">
                    Sign in
                </button>
                <button type="submit" onClick={handleNextPage} className="components__login-form-secondButton">
                    <span>Register for a free trial now</span>
                </button>
                <div className="text-center">Or sign in with</div>
                <button className="components__login-form-thirdButton">Google</button>
                <p id="error-message" className="error-message text-danger mt-2"></p>
            </div>
        </div>
    );
};

export default LoginForm;
