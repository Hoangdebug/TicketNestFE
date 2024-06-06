import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReduxStates } from '@redux/reducers';
import { routes } from '@utils/constants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TheatersIcon from '@mui/icons-material/Theaters';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { images } from '@utils/constants';
import { IAdminPage, IAdminPageProps, IAdminPageState } from '@interfaces/pages/admin';

const AdminPages: IAdminPage<IAdminPageProps> = () => {
    const { profile } = useSelector((states: ReduxStates) => states);
    const router = useRouter();
    const [openDropdowns, setOpenDropdowns] = useState<IAdminPageState>({
        event: false,
        customer: false,
        theater: false,
        settings: false,
    });

    // const {event, customer, theater, settings} = openDropdowns;

    const toggleDropdown = (menu: any) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const sideBar = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />,
            class: '',
        },
        {
            title: 'Event',
            key: 'event',
            href: '#',
            icon: <EventIcon />,
            class: '',
            submenu: [
                { title: 'Add New', href: '/events/add' },
                { title: 'Check Schedule', href: '/events/schedule' },
                { title: 'Order List', href: '/events/orders' },
            ],
        },
        {
            title: 'Customer',
            key: 'customer',
            href: '#',
            icon: <PeopleIcon />,
            class: '',
            submenu: [
                { title: 'Customer List', href: '/customers/list' },
                { title: 'Customer Orders', href: '/customers/orders' },
            ],
        },
        {
            title: 'Theater',
            key: 'theater',
            href: '#',
            icon: <TheatersIcon />,
            class: '',
            submenu: [
                { title: 'Add Theater', href: '/theaters/add' },
                { title: 'Manage Theaters', href: '/theaters/manage' },
            ],
        },
        {
            title: 'Settings',
            key: 'settings',
            href: '#',
            icon: <SettingsIcon />,
            class: '',
            submenu: [
                { title: 'Profile', href: '/settings/profile' },
                { title: 'Security', href: '/settings/security' },
            ],
        },
    ];

    return (
        <div className="pages__admin row">
            <div className="pages__admin-content col-md-2 p-4 col-sm-12">
                <div className="pages__admin-content-logo">
                    {/* Add your logo here */}
                    <img src={images.LOGO_SIDEBAR} alt="Logo" className="fluid" />
                </div>
                <button className="pages__admin-content-button">+ New Event</button>
                <div className="pages__admin-content-item">
                    {sideBar?.map((item, index) => (
                        <div key={index}>
                            <a
                                className="pages__admin-content-item-subItem"
                                href={item.href}
                                onClick={(e) => {
                                    if (item.submenu) {
                                        e.preventDefault();
                                        toggleDropdown(item.key);
                                    }
                                }}
                                style={{ cursor: item.submenu ? 'pointer' : 'default' }}>
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                                {item.submenu && (
                                    <span className="ml-auto">{openDropdowns[item.key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}</span>
                                )}
                            </a>
                            {item.submenu && openDropdowns[item.key] && (
                                <div className="pages__admin-content-item-submenu ml-3">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <div key={subIndex}>
                                            <a className="pages__admin-content-item-submenu-navlink" href={subItem.href}>
                                                {subItem.title}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="pages__admin-main col-md-9 col-sm-12">{/* Main content area */}</div>
        </div>
    );
};

export default AdminPages;
