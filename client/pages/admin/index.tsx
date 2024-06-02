import { ReduxStates } from '@redux/reducers';
import { enums, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminPages = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    const router = useRouter();
    const sideBar = [
        {
            title: 'trung',
            href: '/#',
        },
        {
            title: 'v',
            href: routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href,
        },
        {
            title: 'b',
            href: routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href,
        },
        {
            title: 'c',
            link: routes.CLIENT.POSTFORGOTPASSWORD_PAGE.href,
        },
    ];

    useEffect(() => {
        const isAdmin = profile?.details?.role;
        console.log(isAdmin);

        if (!isAdmin?.includes(enums?.ROLE?.ADMIN)) {
            router.push(routes.CLIENT.HOME_PAGE.href);
        }

        const accessToken = authHelper.accessToken();
        if (accessToken) {
            const currentPath = router.pathname;
            if (currentPath === routes.CLIENT.LOGIN_PAGE.href || currentPath === routes.CLIENT.REGISTER_PAGE.href) {
                router.push(routes.CLIENT.HOME_PAGE.href);
            }
        } else {
            router.push(routes.CLIENT.LOGIN_PAGE.href);
        }
    }, [profile, router]);

    return (
        <div className="row">
            <div className="col-md-3 p-4 col-sm-12">
                {sideBar?.map((item, index) => (
                    <div key={index}>
                        <a href={item.href}>{item.title}</a>
                    </div>
                ))}
            </div>
            <div className="col-md-9 col-sm-12">hehehe</div>
        </div>
    );
};

export default AdminPages;
