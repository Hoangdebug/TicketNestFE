import { fetchGetCurrentAccount } from '@redux/actions/api';
import { images, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';

const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [state, setState] = useState<IHeaderComponentState>({
        isOpen: false,
        isActive: routes.CLIENT.HOME_PAGE.href,
    });

    const { isOpen } = state;

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
    const data = [
        {
            title: 'Schedule',
            href: routes.CLIENT.HOME_PAGE.href,
        },
        {
            title: 'Speakers',
            href: routes.CLIENT.CHANGE_PASSWORD_PAGE.href,
        },
        {
            title: 'Ticket',
            href: '#1',
        },
        {
            title: 'Contact',
            href: '#2',
        },
        {
            title: 'Login',
            href: routes.CLIENT.LOGIN_PAGE.href,
            class: 'bases__header-link-login',
        },
    ];

    if (isShow) {
        return (
            <div className="components__header container-fluid d-flex justify-content-around pt-3 align-items-center">
                <div className="">
                    <img src={images.LOGO_HOME} className="bases__width150" />
                </div>
                <div className="components__header-item">
                    <ul className={`d-flex ${isOpen ? 'active' : ''}`} style={{ gap: '40px' }} onClick={handleOpen}>
                        {data?.map((link, index) => (
                            <li className="text-white bases__font--18 bases__header-link bases__width30" key={index}>
                                <a
                                    onClick={() =>
                                        setState((prevState) => ({
                                            ...prevState,
                                        }))
                                    }
                                    style={
                                        router.pathname === link.href
                                            ? {
                                                  borderBottom: '1px solid black',
                                                  color: 'black',
                                              }
                                            : {}
                                    }
                                    className={link.class}
                                    href={link.href}
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
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
