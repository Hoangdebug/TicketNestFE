import { images, routes } from '@utils/constants';
import { useRouter } from 'next/router';

const ChangePasswordSuccessForm: IChangePasswordSuccessComponent<IChangePasswordSuccessComponentProps> = () => {
    const navigate = useRouter();

    const handlePrevPage = () => {
        navigate.push(routes.CLIENT.LOGIN_PAGE.href);
    };

    return (
        <div className="components__changepwsuccess">
            <div className="components__changepwsuccess-form p-4 ">
                <h2 className="fw-bold text-center">Your password has been changed</h2>
                <button type="submit" onClick={handlePrevPage} className="components__changepwsuccess-form-secondButton">
                    <span>Back to sign in</span>
                </button>

                <img className="pages__changepwsuccess-form-logo" style={{ height: '70vh' }} src={images.CHANGEPWSUCCESS_LOGO} alt="" />
            </div>
        </div>
    );
};

export default ChangePasswordSuccessForm;
