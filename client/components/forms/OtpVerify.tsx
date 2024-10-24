import { http, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { createRef, useEffect, useState } from 'react';
import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '@redux/actions/api';
import { validateHelper } from '@utils/helpers';

const OtpVerifyForm: React.FC<IOtpVerifyComponentProps> = () => {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const { query } = navigate;
    const [fromPage, setFromPage] = useState<string>('');
    const [state, setState] = useState<IOtpVerifyComponentState>({
        email: '',
        otp: '',
    });

    const { email, otp } = state;
    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const otpValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
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

    const handleVerifyOtp = async () => {
        console.log('handleVerifyOtp called with:', { email, otp });
        dispatch(
            await verifyOtp(email, { otp }, (res: IOtpVerifyDataApiRes | IErrorAPIRes | null) => {
                console.log('API response:', res);
                if (res && 'code' in res && res.code === http.SUCCESS_CODE) {
                    navigate.push(routes.CLIENT.REGISTERSUCCESS_PAGE.href, undefined, { scroll: false });
                }
            }),
        );
    };

    const handleSubmit = async () => {
        console.log('handleSubmit called');
        let isValidate = true;

        const validator = [
            { ref: emailValidatorRef, value: email, message: 'Email Is Not Empty!' },
            { ref: otpValidatorRef, value: otp, message: 'Otp Is Not Empty!' },
        ];

        validator.forEach(({ ref, value, message }) => {
            ref.current?.onValidateMessage('');
            if (validateHelper.isEmpty(String(value ?? ''))) {
                ref.current?.onValidateMessage(message);
                isValidate = false;
            } else if (validateHelper.isCharacters(String(value ?? ''))) {
                ref.current?.onValidateMessage(`Your ${message} Cannot Be Less Than 2 Characters`);
                isValidate = false;
            }
        });

        if (isValidate) {
            console.log('handleVerifyOtp called');
            await handleVerifyOtp();
        }
    };

    return (
        <div className="components__registersuccess">
            <div className="components__registersuccess-form">
                <h1 className="components__registersuccess-form-firsttext text-center">Verify your account</h1>
                <h5 className="components__registersuccess-form-secondtext text-center p-4">
                    An email has been sent to your {email}. Please check for an email from the company and verify your otp!!!
                </h5>
                <div className="form-group">
                    <label htmlFor="otp">OTP</label>
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
                <button onClick={handleSubmit} type="button" className="components__registersuccess-form-secondbutton btn-large-font">
                    <span>Verify</span>
                </button>
            </div>
        </div>
    );
};

export default OtpVerifyForm;
