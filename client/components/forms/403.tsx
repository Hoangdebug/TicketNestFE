import { ReduxStates } from '@redux/reducers';
import { enums, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const ThirdErrorForm: IThirdErrorComponent<IThirdErrorComponentProps> = () => {
    const router = useRouter();
    const { profile } = useSelector((states: ReduxStates) => states);

    const handleNextPage = () => {
        if (profile && profile.details) {
            const userType = profile.details.type;
            if (userType === enums.TYPES.ADMIN) {
                router.push(routes.CLIENT.ADMIN_PAGE.href, undefined, { scroll: false });
            } else if (userType === enums.TYPES.USER) {
                router.push(routes.CLIENT.HOME_PAGE.href, undefined, { scroll: false });
            } else if (userType === enums.TYPES.ORGANIZER) {
                router.push(routes.CLIENT.ADMIN_PAGE.href, undefined, { scroll: false });
            } else {
                router.push(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
            }
        }
    };

    return (
        <div className="components__thirderror">
            <div className="components__thirderror-form p-4 ">
                <h1 className="components__thirderror-firsttext text-center">Access Limited</h1>
                <h4 className="components__thirderror-secondtext text-center ">Sorry, you don't have permission to access this page.</h4>
                <button onClick={handleNextPage} type="submit" className="components__thirderror-form-firstbutton">
                    Back to the previous
                </button>
            </div>
        </div>
    );
};

export default ThirdErrorForm;
