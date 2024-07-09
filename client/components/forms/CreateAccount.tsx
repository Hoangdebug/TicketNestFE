import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import Input from '@components/commons/Input';
import Select from '@components/commons/Select';
import Button from '@components/commons/Button';
import { enums, http, images, routes } from '@utils/constants';
import { useDispatch } from 'react-redux';
import { fetchCreateAccountByAdmin } from '@redux/actions/api';
import { setModal } from '@redux/actions';
import Img from 'react-cool-img';

const CreateAccountForm: ICreateAccountComponent<ICreateAccountComponentProps> = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [state, setState] = useState<ICreateAccountComponentState>({
        email: '',
        password: '',
        role: '',
        username: '',
    });

    const { email, password, role, username } = state;

    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();
    const roleValidatorRef = createRef<IValidatorComponentHandle>();
    const usernameValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleBeforeUnload = () => {
        setState({
            email: '',
            password: '',
            role: enums.ROLE.ADMIN,
            username: '',
        });
    };

    useEffect(() => {
        handleBeforeUnload();
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleSubmitAddAccount = async () => {
        dispatch(
            await fetchCreateAccountByAdmin({ email, password, role, username }, (res: IRegisterDataApiRes | IErrorAPIRes | null) => {
                if (res?.code === http.SUCCESS_CODE) {
                    dispatch(
                        setModal({
                            isShow: true,
                            content: (
                                <>
                                    <div className="text-center bases__margin--bottom31">
                                        <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                                    </div>
                                    <div className="bases__text--bold bases__font--14 text-center">Create Success! </div>
                                </>
                            ),
                            button: (
                                <Button
                                    className="bases__margin--right32"
                                    fontSize="14"
                                    textColor="white"
                                    buttonText="List User"
                                    background="blue"
                                    onClick={() => {
                                        router.push(routes.CLIENT.ADMIN_LIST_CUSTOMER_PAGE.href, undefined, { scroll: false });
                                        dispatch(
                                            setModal({
                                                isShow: false,
                                            }),
                                        );
                                    }}
                                />
                            ),
                        }),
                    );
                } else {
                    setModal({
                        isShow: true,
                        content: (
                            <>
                                <div className="text-center bases__margin--bottom31">
                                    <Img src={images.ICON_TIMES} className="bases__width--90 bases__height--75" />
                                </div>
                                <div className="bases__text--bold bases__font--14 text-center">Has been Error!</div>
                            </>
                        ),
                    });
                }
            }),
        );
    };

    const handleSubmit = async () => {
        let isValidate = true;

        const validator = [
            { ref: emailValidatorRef, value: email, message: 'Email Is Not Empty!' },
            { ref: passwordValidatorRef, value: password, message: 'Password Is Not Empty!' },
            { ref: roleValidatorRef, value: role, message: 'Role Is Not Empty!' },
            { ref: usernameValidatorRef, value: username, message: 'Username Is Not Empty!' },
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
            await handleSubmitAddAccount();
        }
    };

    const renderRoleOptions = () => {
        const roleOptions = [
            {
                value: enums.ROLE.ADMIN,
                label: enums.ROLE.ADMIN,
            },
            {
                value: enums.ROLE.USER,
                label: enums.ROLE.USER,
            },
        ];

        return roleOptions;
    };

    return (
        <div className="components__createAcc">
            <div className="components__createAcc-form p-3">
                <div className="row">
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="email" className="pb-2">
                                Email <span className="text-danger">*</span>
                            </label>
                            <Validator ref={emailValidatorRef}>
                                <Input
                                    type="text"
                                    value={email}
                                    onChange={(value: string) => handleOnChange('email', value)}
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="pb-2">
                                Password <span className="text-danger">*</span>
                            </label>
                            <Validator ref={passwordValidatorRef}>
                                <Input
                                    type="password"
                                    value={password ?? ''}
                                    onChange={(value: string) => handleOnChange('password', value)}
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                />
                            </Validator>
                        </div>
                    </div>
                    <div className="col-md-6 gap-4 d-flex flex-column ">
                        <div className="form-group">
                            <label htmlFor="role" className="pb-2">
                                Role <span className="text-danger">*</span>
                            </label>
                            <Validator ref={roleValidatorRef}>
                                <Select
                                    value={role}
                                    onChange={(value: string) => handleOnChange('role', value)}
                                    options={renderRoleOptions()}
                                />
                            </Validator>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="pb-2">
                                Username <span className="text-danger">*</span>
                            </label>
                            <Validator ref={usernameValidatorRef}>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(value: string) => handleOnChange('username', value)}
                                    id="username"
                                    name="username"
                                    placeholder="Enter Username"
                                />
                            </Validator>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse gap-2">
                    <Button buttonText="Register" onClick={handleSubmit} background="green" fontSize="14" />
                    <Button buttonText="Clear" onClick={() => handleBeforeUnload} fontSize="14" />
                </div>
            </div>
        </div>
    );
};

export default CreateAccountForm;
