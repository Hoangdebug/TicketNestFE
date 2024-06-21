import { IEventDetail, IEventDetailPage, IEventDetailPageProps } from '@interfaces/pages/eventDetail';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EventDetailPage: IEventDetailPage<IEventDetailPageProps> = () => {
    const router = useRouter();
    const { id } = router.query;
    const [eventData, setEventData] = useState<IEventDetail | null>(null);

    useEffect(() => {
        if (id) {
            // Giả lập lấy dữ liệu từ backend bằng cách sử dụng dữ liệu mẫu
            const sampleData: IEventDetail = {
                id: id as string,
                title: 'Tutorial on Canvas Painting for Beginners',
                date: 'Wed, Jun 01, 2022 5:30 AM',
                image: '/path/to/image.jpg',
                days: 346,
                hours: 8,
                minutes: 25,
                seconds: 46,
                organizer: 'Story Tellers',
                price: 'AUD $50.00',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus.',
                moreEvents: [
                    {
                        id: '2',
                        title: 'A New Way Of Life',
                        image: '/path/to/image1.jpg',
                        price: 'AUD $100.00',
                        date: '15 Apr • Fri, 3:45 PM',
                    },
                    {
                        id: '3',
                        title: 'Earrings Workshop with Bronwyn David',
                        image: '/path/to/image2.jpg',
                        price: 'AUD $75.00',
                        date: '30 Apr • Sat, 11:20 PM',
                    },
                    {
                        id: '4',
                        title: 'Spring Showcase Saturday April 30th 2022 at 7pm',
                        image: '/path/to/image3.jpg',
                        price: 'Free',
                        date: '1 May • Sun, 4:30 PM',
                    },
                    {
                        id: '5',
                        title: 'Shutter Life',
                        image: '/path/to/image4.jpg',
                        price: 'AUD $85.00',
                        date: '1 May • Sun, 5:30 PM',
                    },
                ],
            };
            setEventData(sampleData);
        }
    }, [id]);

    if (!eventData) return <div>Loading...</div>;

    return (
        <div className="pages__eventDetail d-flex flex-column">
            <div className="pages__eventDetail__header d-flex">
                <div className="pages__eventDetail__header-left">
                    <div className="pages__eventDetail__date-box">
                        <div className="pages__eventDetail__date">JUN</div>
                        <div className="pages__eventDetail__day">01</div>
                    </div>
                    <div>
                        <h1 className="pages__eventDetail__title">{eventData.title}</h1>
                        <p className="pages__eventDetail__subtitle">Online Event • Starts on {eventData.date} • 1h</p>
                    </div>
                </div>
                <img src={eventData.image} alt="Event" className="pages__eventDetail__image" />
            </div>
            <div className="pages__eventDetail__details d-flex flex-wrap">
                <div className="pages__eventDetail__countdown col-md-3 col-sm-6">
                    <div>
                        <span>{eventData.days}</span> DAYS
                    </div>
                    <div>
                        <span>{eventData.hours}</span> HOURS
                    </div>
                    <div>
                        <span>{eventData.minutes}</span> MINUTES
                    </div>
                    <div>
                        <span>{eventData.seconds}</span> SECONDS
                    </div>
                </div>
                <div className="pages__eventDetail__organizer col-md-3 col-sm-6">
                    <p>Organized by</p>
                    <h2>{eventData.organizer}</h2>
                    <a href="#">View Profile</a>
                </div>
                <div className="pages__eventDetail__datetime col-md-3 col-sm-6">
                    <p>Date and Time</p>
                    <h2>{eventData.date}</h2>
                    <a href="#">Add to Calendar</a>
                </div>
                <div className="pages__eventDetail__location col-md-3 col-sm-6">
                    <p>Location</p>
                    <h2>Online</h2>
                </div>
                <div className="pages__eventDetail__price col-md-3 col-sm-6">
                    <p>Price</p>
                    <h2>{eventData.price}</h2>
                </div>
                <div className="col-12">
                    <button className="pages__eventDetail__book-now btn btn-success">Book Now</button>
                </div>
            </div>
            <div className="pages__eventDetail__about">
                <h2>About This Event</h2>
                <p>{eventData.description}</p>
            </div>
            <div className="pages__eventDetail__more-events">
                <h2>More Events</h2>
                <div className="pages__eventDetail__more-events-list d-flex flex-wrap">
                    {eventData.moreEvents.map((event) => (
                        <div key={event.id} className="pages__eventDetail__more-event-card col-md-3 col-sm-6">
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.price}</p>
                            <p>{event.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetailPage;
