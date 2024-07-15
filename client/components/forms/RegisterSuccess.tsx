import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';

const RegisterSuccessForm: IRegisterSuccessComponent<IRegisterSuccessComponentProps> = () => {
    const navigate = useRouter();
    const handleNextPage = () => {
        navigate.push(routes.CLIENT.LOGIN_PAGE.href);
    };
    return (
        <div className="components__registersuccess">
            <div className="components__registersuccess-form ">
                <h1 className="components__registersuccess-form-firsttext text-center">Success!</h1>
                <h5 className="components__registersuccess-form-secondtext text-center p-4">
                    {' '}
                    Congratulations, you have successfully authenticated. Please return to the login page!!!!
                </h5>
                <button onClick={handleNextPage} type="button" className="components__registersuccess-form-secondbutton  btn-large-font ">
                    {' '}
                    <span>Back to Login</span>
                </button>
            </div>
        </div>
    );
};

export default RegisterSuccessForm;
