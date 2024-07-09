import React, { useEffect, useState } from 'react';
import Button from '@components/commons/Button';
import { useRouter } from 'next/router';
import TodayIcon from '@mui/icons-material/Today';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { routes } from '@utils/constants';
import moment from 'moment';

const EventList: IEventListComponent<IEventListComponentProps> = (props) => {
    const { dataEvent } = props;
    const router = useRouter();

    const [state, setState] = useState<IEventListComponentState>({
        type: 'All',
        isActive: undefined,
    });
    const { type, isActive } = state;

    const handleClick = () => {
        setState((prevState) => ({
            ...prevState,
            isActive: !isActive,
        }));
    };

    useEffect(() => {
        const { type } = router.query;
        if (type === 'All' || type === 'Music' || type === 'Dramatic' || type === 'Workshop') {
            setState((prevState) => ({ ...prevState, type }));
        } else {
            setState((prevState) => ({ ...prevState, type: 'All' }));
        }
    }, [router.query]);
    const formattedDayStart = moment(dataEvent?.[0]?.day_start).format('MMM DD, YYYY');
    const formattedDayEnd = moment(dataEvent?.[0]?.day_end).format('MMM DD, YYYY');
    const listTypeSearch = [
        { title: 'All', query: 'All' },
        { title: 'Music', query: 'Music' },
        { title: 'Dramatic', query: 'Dramatic' },
        { title: 'Work Shop', query: 'Workshop' },
    ];

    const filteredEvents = dataEvent?.filter((event) => (type === 'All' ? true : event?.event_type === type));

    return (
        <div className="components__event p-4">
            <div className="components__event--content col-sm-12 bases__margin--bottom40">
                <h1 className="fw-bold">Explore Events</h1>
                <div className="d-flex gap-3 py-4">
                    {listTypeSearch.map((item, index) => (
                        <div key={index}>
                            <Button
                                buttonText={item.title}
                                background={type === item.query ? 'black' : 'white'}
                                textColor={type === item.query ? 'white' : 'black'}
                                className={`${type === item.query ? 'actived' : ''} components__event--btnFilter`}
                                onClick={() =>
                                    router.push({ pathname: router.pathname, query: { type: item.query } }, undefined, { scroll: false })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="components__event--items row">
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((item, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="components__event--items-card">
                                <div className="w-100" style={{ position: 'relative' }}>
                                    <img src={item?.image} alt={item?.name} className="components__event--items-card-img img-fluid w-100" />
                                    <div className="components__event--items-save" onClick={handleClick}>
                                        {isActive ? (
                                            <BookmarkOutlinedIcon sx={{ cursor: 'pointer', color: '#fff', fontSize: '30px' }} />
                                        ) : (
                                            <BookmarkBorderOutlinedIcon sx={{ cursor: 'pointer', color: '#fff', fontSize: '30px' }} />
                                        )}
                                    </div>
                                </div>
                                <div className="p-3 ">
                                    <h3
                                        onClick={() =>
                                            router.push(
                                                { pathname: routes.CLIENT.EVENT_DETAILS.href, query: { id: item._id } },
                                                undefined,
                                                { scroll: false },
                                            )
                                        }
                                        className="fw-bold pb-5 bases__font--20 bases__p--cusor"
                                    >
                                        {item?.name}
                                    </h3>
                                    <p>{item?.price} $</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="d-flex flex-row w-100 gap-2">
                                            <TodayIcon />
                                            <p className="m-0">{formattedDayStart}</p>
                                        </span>
                                        <span className="d-flex flex-row w-100 gap-2" style={{ justifyContent: 'flex-end' }}>
                                            <WatchLaterIcon />
                                            <p className="m-0">{formattedDayEnd}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center bases__font--16 fw-bolder">No events today</div>
                )}
            </div>
        </div>
    );
};

export default EventList;
