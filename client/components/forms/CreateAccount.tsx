import { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Validator from '@components/commons/Validator';
import { validateHelper } from '@utils/helpers';
import Input from '@components/commons/Input';
import Select from '@components/commons/Select';
import Button from '@components/commons/Button';
import { enums, http, routes } from '@utils/constants';
import { useDispatch } from 'react-redux';
import { fetchAddAccount, fetchUpdateAccount } from '@redux/actions/api';

const CreateAccountForm: ICreateAccountComponent<ICreateAccountComponentProps> = (props) => {
    const { account } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { id } = query;

    const [state, setState] = useState<ICreateAccountComponentState>({
        accountAdd: {
            ...(account ?? {}),
        },
    });

    const { accountAdd } = state;

    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();
    const roleValidatorRef = createRef<IValidatorComponentHandle>();
    const usernameValidatorRef = createRef<IValidatorComponentHandle>();

    const handleOnChange = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            accountAdd: {
                ...prevState.accountAdd,
                [field]: value,
            },
        }));
    };

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            accountAdd: {
                ...prevState.accountAdd,
                email: account?.email ?? '',
                password: account?.password ?? '',
                role: account?.role ?? enums.ROLE.USER,
                username: account?.username ?? '',
            },
        }));
    }, [account]);

    const hanldeCancelBack = () => {
        router.back();
    };

    const handleSubmitUpdateAccount = async () => {
        // dispatch(
        //     await fetchUpdateAccount(id?.toString() ?? '', accountAdd ?? {}, (res: IAccountDataApiRes | IErrorAPIRes | null) => {
        //         if (res?.code === http.SUCCESS_CODE) {
        //             router.push(routes.CLIENT.ACCOUNT_LIST.href, undefined, { scroll: false });
        //         } else if (res?.code === http.ERROR_EXCEPTION_CODE) {
        //             alert(res?.mes);
        //         }
        //     }),
        // );
    };

    const handleSubmitAddAccount = async () => {
        // dispatch(
        //     await fetchAddAccount(accountAdd ?? {}, (res: IAccountDataApiRes | IErrorAPIRes | null) => {
        //         if (res?.code === http.SUCCESS_CODE) {
        //             router.push(routes.CLIENT.ACCOUNT_LIST.href, undefined, { scroll: false });
        //         } else if (res?.code === http.ERROR_EXCEPTION_CODE) {
        //             alert(res?.mes);
        //         }
        //     }),
        // );
    };

    const handleSubmit = async () => {
        let isValidate = true;

        const validator = [
            { ref: emailValidatorRef, value: accountAdd?.email, message: 'Email Is Not Empty!' },
            { ref: passwordValidatorRef, value: accountAdd?.password, message: 'Password Is Not Empty!' },
            { ref: roleValidatorRef, value: accountAdd?.role, message: 'Role Is Not Empty!' },
            { ref: usernameValidatorRef, value: accountAdd?.username, message: 'Username Is Not Empty!' },
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
            if (id) {
                await handleSubmitUpdateAccount();
            } else {
                await handleSubmitAddAccount();
            }
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
                                    type="email"
                                    value={accountAdd?.email}
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
                                    value={accountAdd?.password}
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
                                    value={accountAdd?.role}
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
                                    value={accountAdd?.username}
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
                    <Button buttonText="Clear" onClick={() => setState({ accountAdd: {} })} fontSize="14" />
                </div>
            </div>
        </div>
    );
};

export default CreateAccountForm;
