import Img from '@components/commons/Img';
import Link from 'next/link';
import { Accordion } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSidebar } from '@redux/actions/common';

const Toggle: IToggleComponent<IToggleComponentProps> = (props) => {
    const { data } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<IToggleComponentState>({ highlightClass: '', activeClass: '', isFirstTime: true, activeLink: '' });

    const isSub = (parent: string) => {
        let isSub = false;
        data?.map((item) => {
            item?.options?.map((option) => {
                if (option.href && parent.endsWith(option.href ?? '')) {
                    if (option.childHrefs) {
                        option.childHrefs.map((ch) => {
                            if (window.location.href.includes(ch)) {
                                isSub = true;
                            }
                        });
                    }
                }
            });
        });
        return isSub;
    };
    const { activeClass, highlightClass, isFirstTime, activeLink } = state;

    const handleSetState = (value: string, field: 'activeClass' | 'highlightClass') => {
        setState((prevState) => ({ ...prevState, [field]: value }));
    };

    const getActiveIndex = () => {
        const sidebarMenu = document.querySelectorAll('.item-link');
        let itemIndex = -1;
        if (sidebarMenu.length > 0) {
            sidebarMenu.forEach((element, index) => {
                const links = element.querySelectorAll(`a`);
                links.forEach((link) => {
                    if (link.href === window.location.href || isSub(link.href)) {
                        itemIndex = index;
                    }
                });
            });
        }
        return itemIndex;
    };

    useEffect(() => {
        if (!isFirstTime) {
            setItemHighlight();
        }
    }, [activeClass, highlightClass]);

    useEffect(() => {
        setLinkHighlight();
    }, [getActiveIndex()]);

    useEffect(() => {
        setLinkHighlight();
    }, [activeLink]);

    const setLinkHighlight = () => {
        const sidebarMenu = document.querySelectorAll('.item-link');
        if (sidebarMenu.length > 0) {
            sidebarMenu.forEach((element) => {
                const links = element.querySelectorAll(`a`);
                links.forEach((link) => {
                    if (link.href === window.location.href || isSub(link.href)) {
                        element?.querySelectorAll('.accordion-item')[0].classList?.add('active');
                        handleSetState(element?.querySelectorAll('.accordion-item')[0].classList.toString(), 'activeClass');
                        link.classList?.add('active');
                    }
                });
            });
        }
    };

    const setItemHighlight = () => {
        const sidebarMenu = document.querySelectorAll('.item-link');
        if (sidebarMenu.length > 0) {
            sidebarMenu.forEach((element) => {
                const links = element.querySelectorAll(`a`);
                links.forEach((link) => {
                    if (link.href === window.location.href || isSub(link.href)) {
                        if (activeClass !== highlightClass) {
                            element?.querySelectorAll('.accordion-item h2 button a')[0].classList.add('components__toggle-active-text');
                        } else {
                            element?.querySelectorAll('.accordion-item h2 button a')[0].classList.remove('components__toggle-active-text');
                        }
                    }
                });
            });
        }
    };

    const handleClick = (event?: React.MouseEvent<HTMLElement>, where: 'link' | 'item' = 'link', link?: string) => {
        setState((prevState) => ({ ...prevState, isFirstTime: false }));
        removeStatus();
        if (where === 'link') {
            setLinkHighlight();
            setState((prevState) => ({ ...prevState, activeLink: link ?? '' }));
        }
        if (where === 'item') {
            event?.currentTarget.classList.add('active');
            handleSetState(event?.currentTarget.classList.toString() ?? '', 'highlightClass');
        }

        dispatch(
            setSidebar({
                isSidebarShow: false,
            }),
        );
    };

    const removeStatus = () => {
        const getLink = document.querySelectorAll('.components__toggle-link');
        const singleItem = document.querySelectorAll('.accordion-item');
        getLink.forEach((element) => {
            element?.classList?.remove('active');
        });
        singleItem.forEach((element) => {
            element?.classList?.remove('active');
        });
    };

    return (
        <div className="components__toggle">
            <Accordion key={getActiveIndex()} defaultActiveKey={`accordion_item_${getActiveIndex()}`}>
                {data?.map((item, index: number) => {
                    return (
                        <div
                            className={`${item?.href ? 'components__toggle_single-item' : `components__toggle-collapsed`} item-link`}
                            key={index}
                        >
                            <Accordion.Item
                                className={`accordion_item_${index}`}
                                eventKey={`accordion_item_${index}`}
                                onClick={(event) => {
                                    handleClick(event, 'item');
                                }}
                            >
                                <Accordion.Header className="position-relative">
                                    <div className="d-flex align-items-center p-0 position-relative w-100 bases__height56">
                                        {item?.href ? (
                                            <Link scroll={false} href={item.href}>
                                                <a>
                                                    <Img src={item.icon} />
                                                </a>
                                            </Link>
                                        ) : (
                                            <Img src={item.icon} />
                                        )}
                                        <div className="w-100 bases__height56">
                                            {item?.href ? (
                                                <Link scroll={false} href={item.href}>
                                                    <a className="bases__font--14 bases__text--bold bases__margin--left14 text-nowrap position-absolute bases__height5 d-flex align-items-center">
                                                        {item?.title ?? ''}
                                                    </a>
                                                </Link>
                                            ) : (
                                                <a className="bases__font--14 bases__text--bold bases__margin--left14 text-nowrap d-flex align-items-center w-100 bases__height--56 m-0">
                                                    {item.title}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body key={activeLink}>
                                    {item.options?.map((item, index: number) => {
                                        return (
                                            <Link scroll={false} key={index} href={item?.href ?? ''}>
                                                <a
                                                    key={activeLink}
                                                    onClick={(event) => handleClick(event, 'link', item?.href ?? '')}
                                                    className={
                                                        'bases__font--13 bases__height--34 bases__margin--left56 d-flex align-items-center components__toggle-link'
                                                    }
                                                >
                                                    {item.title}
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default Toggle;
