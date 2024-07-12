import { createRef, useState } from 'react';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import { http, images, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import Input from '@components/commons/Input';
import { useDispatch } from 'react-redux';
import { fetchForgotPassword } from '@redux/actions/api';
import { setModal } from '@redux/actions';
import Img from '@components/commons/Img';
import Button from '@components/commons/Button';

const ForgotPasswordForm: IForgotPasswordComponent<IForgotPasswordComponentProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [state, setState] = useState<IForgotPasswordComponentState>({
        email: '',
    });
    const { email } = state;

    const handlePrevPage = () => {
        router.back();
    };

    const handleNextPage = () => {
        router.push(routes.CLIENT.CHANGE_PASSWORD_PAGE.href);
    };

    const emailValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (feild: string, value: string | null) => {
        setState((prev) => ({
            ...prev,
            [feild]: value,
        }));
    };

    const submitForm = async () => {
        let isValidate = true;

        const validatorText = [{ ref: emailValidatorRef, value: email, message: 'Your Mail Is Not Empty!' }];

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
            dispatch(
                await fetchForgotPassword(email?.toString() ?? '', (res: IEditUserProfileAPIRes | IErrorAPIRes | null) => {
                    if (res?.code === http.SUCCESS_CODE) {
                        dispatch(
                            setModal({
                                isShow: true,
                                content: (
                                    <>
                                        <div className="text-center bases__margin--bottom31">
                                            <Img src={images.ICON_SUCCESS} className="bases__width--90 bases__height--75" />
                                        </div>
                                        <div className="bases__text--bold bases__font--14 text-center">
                                            Reset Password Link Has Been Sent!
                                        </div>
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
                    } else {
                        dispatch(
                            setModal({
                                isShow: true,
                                content: (
                                    <>
                                        <div className="text-center bases__margin--bottom31">
                                            <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                                        </div>
                                        <div className="bases__text--bold bases__font--14 text-center">
                                            Email Not Exist. Please Try Again!!
                                        </div>
                                    </>
                                ),
                            }),
                        );
                    }
                }),
            );
        }
    };

    return (
        <div className="components__forgotpw">
            <div className="components__forgotpw-form p-4 ">
                <h2 className="fw-bold text-center">Forgot Password</h2>
                <div className="text-center">Your password will be reset by email.</div>
                <div className="form-group">
                    <label htmlFor="username">Mail</label>
                    <Validator ref={emailValidatorRef}>
                        <Input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={email ?? ''}
                            onChange={(value: string) => handleOnChange('email', value)}
                            placeholder="Enter Mail to reset password"
                        />
                    </Validator>
                </div>
                <button type="submit" onClick={submitForm} className="components__forgotpw-form-firstButton btn btn-primary btn-block">
                    Send
                </button>
                <button type="submit" onClick={handlePrevPage} className="components__forgotpw-form-secondButton">
                    <span>Back to sign in</span>
                </button>
                <p id="error-message" className="error-message text-danger mt-2"></p>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
