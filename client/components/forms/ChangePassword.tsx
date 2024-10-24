import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateHelper } from '@utils/helpers';
import { http, images, routes } from '@utils/constants';
import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';
import { verifyOtpForgot } from '@redux/actions/api';
import { useDispatch } from 'react-redux';
import { setModal } from '@redux/actions';
import Img from '@components/commons/Img';
import Button from '@components/commons/Button';

const ChangePasswordForm: IChangePasswordComponent<IChangePasswordComponentProps> = () => {
    const navigate = useRouter();
    const dispatch = useDispatch();
    const { query } = navigate;

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleReNewPasswordVisibility = () => {
        setShowReNewPassword(!showReNewPassword);
    };

    const handlePrevPage = () => {
        navigate.push(routes.CLIENT.LOGIN_PAGE.href);
    };

    const handleNextPage = () => {
        navigate.push(routes.CLIENT.CHANGE_PASSWORD_SUCCESS_PAGE.href, undefined, { scroll: false });
    };

    const [state, setState] = useState<IChangePasswordComponentState>({
        email: '',
        otp: '',
        newPassword: '',
        reNewPassword: '',
    });

    const { email, otp, newPassword, reNewPassword } = state;
    const otpValidatorRef = createRef<IValidatorComponentHandle>();
    const newPasswordValidatorRef = createRef<IValidatorComponentHandle>();
    const reNewPasswordValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');

        if (emailParam) {
            setState((prevState) => ({
                ...prevState,
                email: emailParam,
            }));
        }
    }, [query]);

    const handleVerifyOtpForgot = async () => {
        console.log('handleVerifyOtp called with:', { email, otp });
        dispatch(
            await verifyOtpForgot(email, { otp, newPassword }, (res: IOtpVerifyDataApiRes | IErrorAPIRes | null) => {
                console.log('API response:', res);
                if (res && 'code' in res && res.code === http.SUCCESS_CODE) {
                    dispatch(
                        setModal({
                            isShow: true,
                            content: (
                                <>
                                    <div className="text-center bases__margin--bottom31">
                                        <Img src={images.ICON_SUCCESS} className="bases__width--90 bases__height--75" />
                                    </div>
                                    <div className="bases__text--bold bases__font--14 text-center">Password had reset</div>
                                </>
                            ),
                            button: (
                                <>
                                    <Button
                                        textColor="white"
                                        background="blue"
                                        buttonText="Continue"
                                        onClick={() => {
                                            handleNextPage();
                                            dispatch(
                                                setModal({
                                                    isShow: false,
                                                }),
                                            );
                                        }}
                                    />
                                </>
                            ),
                        }),
                    );
                }
            }),
        );
    };

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [
            { ref: otpValidatorRef, value: otp, message: 'Your New Password Is Not Empty!' },
            { ref: newPasswordValidatorRef, value: newPassword, message: 'Your New Password Is Not Empty!' },
            { ref: reNewPasswordValidatorRef, value: reNewPassword, message: 'Your Re New Password Is Not Empty!' },
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

        if (reNewPassword !== newPassword) {
            reNewPasswordValidatorRef.current?.onValidateMessage('New Password And Re New Password Is Not Same. Please Enter Again');
            isValidate = false;
        }

        // call api
        if (isValidate) {
            console.log('handleVerifyOtpForgot called');
            await handleVerifyOtpForgot();
        }
    };
    return (
        <div className="components__changepw">
            <div className="components__changepw-form p-4 ">
                <h2 className="fw-bold text-center">Change Password</h2>
                <div className="form-group position-relative">
                    <label htmlFor="text">
                        OTP
                        <span className="text-danger">*</span>
                    </label>
                    <Validator ref={otpValidatorRef}>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(value: string) => handleOnChange('otp', value)}
                            id="otp"
                            name="otp"
                            placeholder="Enter OTP"
                        />
                    </Validator>
                </div>
                <div className="form-group position-relative">
                    <label htmlFor="password">
                        New Password
                        <span className="text-danger">*</span>
                    </label>
                    <Validator ref={newPasswordValidatorRef}>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={newPassword ?? ''}
                            onChange={(e) => handleOnChange('newPassword', e.target.value)}
                            placeholder="Enter new password"
                        />
                    </Validator>
                    {showNewPassword ? (
                        <RemoveRedEyeIcon
                            onClick={toggleNewPasswordVisibility}
                            sx={{
                                top: 30,
                                right: 7,
                                position: 'absolute',
                                cursor: 'pointer',
                            }}
                        />
                    ) : (
                        <VisibilityOffIcon
                            onClick={toggleNewPasswordVisibility}
                            sx={{
                                top: 30,
                                right: 7,
                                position: 'absolute',
                                cursor: 'pointer',
                            }}
                        />
                    )}
                </div>
                <div className="form-group position-relative">
                    <label htmlFor="password">
                        Re New Password
                        <span className="text-danger">*</span>
                    </label>
                    <Validator ref={reNewPasswordValidatorRef}>
                        <input
                            type={showReNewPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={reNewPassword ?? ''}
                            onChange={(e) => handleOnChange('reNewPassword', e.target.value)}
                            placeholder="Re enter new password"
                        />
                    </Validator>
                    {showReNewPassword ? (
                        <RemoveRedEyeIcon
                            onClick={toggleReNewPasswordVisibility}
                            sx={{
                                top: 30,
                                right: 7,
                                position: 'absolute',
                                cursor: 'pointer',
                            }}
                        />
                    ) : (
                        <VisibilityOffIcon
                            onClick={toggleReNewPasswordVisibility}
                            sx={{
                                top: 30,
                                right: 7,
                                position: 'absolute',
                                cursor: 'pointer',
                            }}
                        />
                    )}
                </div>
                <button type="submit" onClick={submitForm} className="components__changepw-form-firstButton btn btn-primary btn-block">
                    Change Password
                </button>
                <button type="submit" onClick={handlePrevPage} className="components__changepw-form-secondButton">
                    <span>Back to sign in</span>
                </button>
                <p id="error-message" className="error-message text-danger mt-2"></p>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
