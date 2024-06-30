import React, { useEffect, useState } from 'react';
import Button from '@components/commons/Button';
import { useRouter } from 'next/router';

import TodayIcon from '@mui/icons-material/Today';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

const EventList: IEventListComponent<IEventListComponentProps> = (props) => {
    const { dataEvent } = props;

    console.log(dataEvent);
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

        if (type === 'All' || type === 'Music' || type === 'Dramatic' || type === 'Work Shop') {
            setState({ type });
        } else {
            setState({ type: undefined });
        }
    }, [router.query]);

    const listTypeSearch = [
        {
            title: 'All',
            query: 'All',
        },
        {
            title: 'Music',
            query: 'Music',
        },
        {
            title: 'Dramatic',
            query: 'Dramatic',
        },
        {
            title: 'Work Shop',
            query: 'Work Shop',
        },
    ];
    const listEvent = [
        {
            title: 'Concert in the Park',
            priceTicket: 'AUD $100.00*',
            date: '2024-07-15',
            time: '19:00',
            srcImg: 'https://imgs.search.brave.com/taN2xwgWjimpefJo3KOgvRZygyDnFcMe75fcbzhGxoY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMud2FsbHBhcGVy/c2Rlbi5jb20vaW1h/Z2Uvd3hsLXlvbmUt/NGstbGVhZ3VlLW9m/LWxlZ2VuZHMtY29v/bF84Njc4MC5qcGc',
        },
        {
            title: 'Art Exhibition: Modern Times',
            priceTicket: 'AUD $50.00',
            date: '2024-08-01',
            time: '17:00',
            srcImg: 'https://imgs.search.brave.com/W1rO_TWJi52skYfVE7FDF6KN2cZGmnMsJz261JI-HPE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXJl/LWdhbGxlcnkuY29t/L21vY2FoYmlnLzM5/NTc2OS13YWxscGFw/ZXIteW9uZS1sb2wt/NGstaGQuanBn',
        },
        {
            title: 'Theater: Hamlet',
            priceTicket: 'AUD $80.00',
            date: '2024-09-10',
            time: '20:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
        {
            title: 'Jazz Night',
            priceTicket: 'AUD $70.00',
            date: '2024-10-22',
            time: '21:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
        {
            title: 'Food Festival',
            priceTicket: 'AUD $30.00',
            date: '2024-11-05',
            time: '12:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
        {
            title: 'Tech Conference 2024',
            priceTicket: 'AUD $200.00',
            date: '2024-12-01',
            time: '09:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
        {
            title: 'Tech Conference 2024',
            priceTicket: 'AUD $200.00',
            date: '2024-12-01',
            time: '09:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
        {
            title: 'Tech Conference 2024',
            priceTicket: 'AUD $200.00',
            date: '2024-12-01',
            time: '09:00',
            srcImg: 'https://imgs.search.brave.com/tg8GbBoWjQhy68fF-PiBTJDATsvAqK4ZVjcsVg5JrNw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2UvNS84/NzE3MDgtYmVzdC1k/YXJpdXMtd2FsbHBh/cGVycy0yNTYweDE0/NDAtZm9yLTRrLW1v/bml0b3IuanBn',
        },
    ];

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
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="components__event--items row">
                {dataEvent?.map((item, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="components__event--items-card">
                            <div className="w-100" style={{ position: 'relative' }}>
                                <img src={item.srcImg} alt={item.title} className="components__event--items-card-img img-fluid w-100" />
                                <div className="components__event--items-save" onClick={handleClick}>
                                    {isActive ? (
                                        <BookmarkOutlinedIcon sx={{ cursor: 'pointer', color: '#fff', fontSize: '30px' }} />
                                    ) : (
                                        <BookmarkBorderOutlinedIcon sx={{ cursor: 'pointer', color: '#fff', fontSize: '30px' }} />
                                    )}
                                </div>
                            </div>
                            <div className="p-3 ">
                                <h3 className="fw-bold pb-5 bases__font--20">{item.title}</h3>
                                <p>{item.priceTicket}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="d-flex flex-row w-100 gap-2">
                                        <TodayIcon />
                                        <p className="m-0">{item.date}</p>
                                    </span>
                                    <span className="d-flex flex-row w-100 gap-2" style={{ justifyContent: 'flex-end' }}>
                                        <WatchLaterIcon />
                                        <p className="m-0">{item.time}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
