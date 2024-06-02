import { fetchGetCurrentAccount } from '@redux/actions/api';
import { ReduxStates } from '@redux/reducers';
import { enums, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { profile } = useSelector((state: ReduxStates) => state);

    useEffect(() => {
        if (authHelper.isAuth()) {
            const memberProfile = async () => {
                dispatch(await fetchGetCurrentAccount());
            };
            memberProfile();
        }
    }, [dispatch, authHelper.isAuth()]);

    useEffect(() => {
        const checkRole = profile?.details?.role;
        console.log(checkRole);
        if (checkRole?.includes(enums.ROLE.ADMIN)) {
            router.push(routes.CLIENT.ADMIN_PAGE.href);
        } else {
            router.push(routes.CLIENT.HOME_PAGE.href);
        }
    }, [profile]);

    if (isShow) {
        return <div>{profile?.details?.username}</div>;
    }
    return <></>;
};

Header.defaultProps = {
    isShow: true,
};
export default Header;
