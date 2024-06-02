import { routes } from '@utils/constants';
import React from 'react';

const AdminPages = () => {
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
