import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { routes, images } from '@utils/constants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import TheatersIcon from '@mui/icons-material/Theaters';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SideBar: ISideBarComponent<ISideBarComponentProps> = () => {
    const router = useRouter();
    const [openDropdowns, setOpenDropdowns] = useState<ISideBarComponentState>({
        event: false,
        customer: false,
        theater: false,
        settings: false,
    });

    const toggleDropdown = (menu: any) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const sideBar = [
        {
            title: 'Dashboard',
            href: routes.CLIENT.ADMIN_PAGE.href,
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
                { title: 'List Event', href: routes.CLIENT.ORGANIZER_LIST_EVENT.href },
                { title: 'Add New', href: routes.CLIENT.ADD_EVENT_PAGE.href },
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
        <div className="components__sidebar-content">
            <div className="components__sidebar-content-logo">
                <img src={images.LOGO_SIDEBAR} alt="Logo" className="fluid" />
            </div>
            <button
                className="components__sidebar-content-button"
                onClick={() => {
                    router.push(routes.CLIENT.ADD_EVENT_PAGE.href);
                }}
            >
                + New Event
            </button>
            <div className="components__sidebar-content-item">
                {sideBar?.map((item, index) => (
                    <div key={index}>
                        <a
                            className="components__sidebar-content-item-subItem"
                            href={item.href}
                            onClick={(e) => {
                                if (item.submenu) {
                                    e.preventDefault();
                                    toggleDropdown(item.key);
                                }
                            }}
                            style={{ cursor: item.submenu ? 'pointer' : 'default' }}
                        >
                            {item.icon}
                            <span className="ml-2">{item.title}</span>
                            {item.submenu && (
                                <span className="ml-auto">{openDropdowns[item.key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}</span>
                            )}
                        </a>
                        {item.submenu && openDropdowns[item.key] && (
                            <div className="components__sidebar-content-item-submenu ml-3">
                                {item.submenu.map((subItem, subIndex) => (
                                    <div key={subIndex}>
                                        <a className="components__sidebar-content-item-submenu-navlink" href={subItem.href}>
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
    );
};

export default SideBar;
