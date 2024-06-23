import { fetchGetCurrentAccount, fetchLogout } from '@redux/actions/api';
import { images, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { ReduxStates } from '@redux/reducers';

const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { profile } = useSelector((states: ReduxStates) => states);
    console.log(profile?.details?.username);

    const [state, setState] = useState<IHeaderComponentState>({
        isOpen: false,
        isActive: routes.CLIENT.HOME_PAGE.href,
    });

    const { isOpen } = state;

    const getLoginTitle = () => {
        if (authHelper.isAuth()) {
            return profile?.details?.username || 'User';
        } else {
            return 'Login';
        }
    };

    useEffect(() => {
        if (authHelper.isAuth()) {
            const memberProfile = async () => {
                dispatch(await fetchGetCurrentAccount());
            };
            memberProfile();
        }
    }, [dispatch, authHelper.isAuth()]);

    const handleOpen = () => {
        setState((prevState) => ({
            ...prevState,
            isOpen: !isOpen,
        }));
    };
    // useEffect(() => {
    //     const checkRole = profile?.details?.role
    //     console.log(checkRole)
    //     if(checkRole?.includes(enums.ROLE.ADMIN)){
    //         router.push(routes.CLIENT.ADMIN_PAGE.href)
    //     }else{
    //         router.push(routes.CLIENT.HOME_PAGE.href)
    //     }
    // }, [profile])
    const handleLogout = () => {
        dispatch(fetchLogout());
    };
    const data = [
        {
            title: 'Schedule',
            href: routes.CLIENT.HOME_PAGE.href,
            class: 'position-relative hover-link',
        },
        {
            title: 'Speakers',
            href: routes.CLIENT.CHANGE_PASSWORD_PAGE.href,
            class: 'position-relative hover-link',
        },
        {
            title: 'Ticket',
            href: '#1',
            class: 'position-relative hover-link',
        },
        {
            title: 'Contact',
            href: '#2',
            class: 'position-relative hover-link',
        },
        // {
        //     title: getLoginTitle(),
        //     href: authHelper.isAuth() ? null : routes.CLIENT.LOGIN_PAGE.href,
        //     class: 'position-relative hover-link',
        //     onclick: authHelper.isAuth() ? handleLogout : null,
        // },
    ];

    if (isShow) {
        return (
            <div className="components__header container-fluid d-flex justify-content-around pt-3 align-items-center">
                <div className="">
                    <img src={images.LOGO_HOME} />
                </div>
                <div className="components__header-item">
                    <ul className={`d-flex ${isOpen ? 'active' : ''}`} style={{ gap: '40px' }} onClick={handleOpen}>
                        {data?.map((link, index) => (
                            <li className="text-white bases__font--18 bases__header-link bases__width30" key={index}>
                                <a
                                    onClick={link.onclick}
                                    className={`${link.class} ${router.pathname === link.href ? 'active' : ''}`}
                                    href={link.href ?? '#'}
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                        <li className="text-white bases__font--18 bases__header-link bases__width30">
                            <div className="dropdown">
                                <a
                                    onClick={(authHelper.isAuth() ? handleLogout : null)}
                                    className={`${'position-relative hover-link '} ${router.pathname === (authHelper.isAuth() ? null : routes.CLIENT.LOGIN_PAGE.href) ? 'active' : ''}`}
                                    href={(authHelper.isAuth() ? null : routes.CLIENT.LOGIN_PAGE.href) ?? '#'}
                                >
                                    {getLoginTitle()}
                                </a>
                                <div className="dropdown-content">
                                    <a href={routes.CLIENT.EDIT_PROFILE_PAGE.href} style={{fontSize: "15px"}}>Edit profile</a>
                                    <a href={routes.CLIENT.REQUEST_ORGNIZE_PAGE.href} style={{fontSize: "15px"}}>Request organize</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="mobile" className="components__header-mobile mb-2" onClick={handleOpen}>
                    {isOpen ? <CloseIcon sx={{ cursor: 'pointer' }} /> : <DehazeIcon sx={{ cursor: 'pointer' }} />}
                </div>
            </div>
        );
    }
    return <></>;
};

Header.defaultProps = {
    isShow: true,
};
export default Header;
