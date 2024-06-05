import { fetchGetCurrentAccount } from '@redux/actions/api';
import { ReduxStates } from '@redux/reducers';
import { enums, images, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const { profile } = useSelector((state: ReduxStates) => state);
    const [activeAble, setActiveAble] = useState(routes.CLIENT.HOME_PAGE.href);

    console.log(activeAble);
    useEffect(() => {
        if (authHelper.isAuth()) {
            const memberProfile = async () => {
                dispatch(await fetchGetCurrentAccount());
            };
            memberProfile();
        }
    }, [dispatch, authHelper.isAuth()]);

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
                <div className="d-flex " style={{ gap: '40px' }}>
                    {data?.map((link, index) => (
                        <div className="text-white bases__font--18 bases__header-link bases__width30" key={index}>
                            <a
                                onClick={() => setActiveAble(link.href)}
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
                        </div>
                    ))}
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
