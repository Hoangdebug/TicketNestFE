import { routes } from '@utils/constants';
import router from 'next/router';

const SuccessPagesForm: IFirstErrorComponent<IFirstErrorComponentProps> = () => {
    const handleNextPage = () => {
        router.push(routes.CLIENT.HOME_PAGE.href);
    };
    return (
        <div className="components__firsterror">
            <div className="components__firsterror-form p-4 ">
                <h1 className="components__firsterror-firsttext text-center">Congratulations</h1>
                <h4 className="components__firsterror-secondtext text-center ">Your payment was successful!</h4>
                <button onClick={handleNextPage} type="submit" className="components__firsterror-form-firstbutton">
                    Go homepage
                </button>
            </div>
        </div>
    );
};

export default SuccessPagesForm;
