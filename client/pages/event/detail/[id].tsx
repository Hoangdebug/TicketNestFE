import { IEventDetail, IEventDetailPage, IEventDetailPageProps } from '@interfaces/pages/eventdetail';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdShare } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import { MdOutlinePeople } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

const EventDetailPage: IEventDetailPage<IEventDetailPageProps> = () => {
    const router = useRouter();
    const { id } = router.query;
    const [eventData, setEventData] = useState<IEventDetail | null>(null);
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        if (id) {
            const sampleData: IEventDetail = {
                id: id as string,
                title: 'Tutorial on Canvas Painting for Beginners',
                date: 'Wed, Jun 01, 2022 5:30 AM',
                image: 'https://qph.cf2.quoracdn.net/main-qimg-d10365c0d88404820cb52a5a91628b0d',
                days: 346,
                hours: 8,
                minutes: 25,
                seconds: 46,
                time: 2,
                organizer: 'Story Tellers',
                price: 'AUD $50.00',
                destination: 'Venue Events',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus.',
                moreEvents: [
                    {
                        id: '2',
                        title: 'A New Way Of Life',
                        image: 'https://qph.cf2.quoracdn.net/main-qimg-d10365c0d88404820cb52a5a91628b0d',
                        price: 'AUD $100.00',
                        date: '15 Apr • Fri, 3:45 PM',
                    },
                    {
                        id: '3',
                        title: 'Earrings Workshop with Bronwyn David',
                        image: 'https://qph.cf2.quoracdn.net/main-qimg-d10365c0d88404820cb52a5a91628b0d',
                        price: 'AUD $75.00',
                        date: '30 Apr • Sat, 11:20 PM',
                    },
                    {
                        id: '4',
                        title: 'Spring Showcase Saturday April 30th 2022 at 7pm',
                        image: 'https://qph.cf2.quoracdn.net/main-qimg-d10365c0d88404820cb52a5a91628b0d',
                        price: 'Free',
                        date: '1 May • Sun, 4:30 PM',
                    },
                    {
                        id: '5',
                        title: 'Shutter Life',
                        image: 'https://qph.cf2.quoracdn.net/main-qimg-d10365c0d88404820cb52a5a91628b0d',
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
        <div className="pages__eventdetail container">
            <div className="pages__eventdetail_headers">
                <div className="pages__eventdetail_headers_sideleft col-md-2">
                    <h4>APR</h4>
                    <h4>30</h4>
                </div>
                <div className="pages__eventdetail_headers_sideright col-md-10">
                    <h2>{eventData.title}</h2>
                    <div className="pages__eventdetail_headers_sideright_param">
                        <IoLocationOutline />
                        <p>
                            {' '}
                            {eventData.destination}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {eventData.date}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {eventData.time}h
                        </p>
                    </div>
                </div>
            </div>
            <div className="pages__eventdetail_body">
                <div className="pages__eventdetail_body_sideleft col-md-8">
                    <div className="pages__eventdetail_body_sideleft_image">
                        <img src={eventData.image} alt="Event Image" />
                    </div>
                    <div className="pages__eventdetail_body_sideleft_actions">
                        <button className="save-button">
                            <CiHeart /> Save
                        </button>
                        <button className="share-button">
                            <IoMdShare />
                            Share
                        </button>
                    </div>
                    <div className="pages__eventdetail_body_sideleft_description">
                        {/* {eventData.description} */}
                        <h2>About This Event</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis
                            faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi
                            ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus
                            venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula
                            consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit
                            tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus.
                            Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur
                            libero.
                        </p>
                    </div>
                </div>

                <div className="pages__eventdetail_body_sideright col-md-4">
                    <div className="pages__eventdetail_body_sideright_titles">
                        <h3>Event Details</h3>
                    </div>

                    <div className="pages__eventdetail_body_sideright_line"></div>

                    <div className="pages__eventdetail_body_sideright_count">
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventData.days}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">DAYS</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventData.hours}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">HOURS</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventData.minutes}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">MINUTES</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventData.seconds}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">SECONDS</span>
                        </div>
                    </div>

                    <div className="pages__eventdetail_body_sideright_infor">
                        <div className="pages__eventdetail_body_sideright_infor_item">
                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <MdOutlinePeople className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Organised by</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">The Teeny Rabbit</span>
                                    <a href="#" className="pages__eventdetail_body_sideright_infor_item_sec_link">
                                        View Profile
                                    </a>
                                </div>
                            </div>

                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <SlCalender className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Date and Time</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">
                                        Sat, Apr 30, 2022 11:30 AM
                                    </span>
                                    <a href="#" className="pages__eventdetail_body_sideright_infor_item_sec_link">
                                        Add to Calendar
                                    </a>
                                </div>
                            </div>

                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <IoLocationOutline className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Location</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">
                                        00 Challis St, Newport, Victoria, 0000, Australia
                                    </span>
                                    <a href="#" className="pages__eventdetail_body_sideright_infor_item_sec_link">
                                        View Map
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pages__eventdetail_body_sideright_titles">
                        <h5>Select Tickets</h5>
                    </div>
                    <div className="pages__eventdetail_body_sideright_line"></div>
                    <div className="pages__eventdetail_body_sideright_seat">
                        <div className="pages__eventdetail_body_sideright_seat_price">{eventData.price}</div>
                        <div className="pages__eventdetail_body_sideright_seat_quantity">
                            <button className="pages__eventdetail_body_sideright_seat_quantity_decrease" onClick={decreaseQuantity}>
                                -
                            </button>
                            <span className="pages__eventdetail_body_sideright_seat_quantity_value">{quantity}</span>
                            <button className="pages__eventdetail_body_sideright_seat_quantity_increase" onClick={increaseQuantity}>
                                +
                            </button>
                        </div>
                    </div>
                    <p>2 x pair hand painted leather earrings 1 x glass of bubbles / or coffee Individual grazing box / fruit cup</p>
                    <div className="pages__eventdetail_body_sideright_line"></div>
                    <div className="pages__eventdetail_body_sideright_actions">
                        <span>1x Ticket(s)</span>
                        <span className="pages__eventdetail_body_sideright_actions_total">AUD $0.00</span>
                    </div>
                    <button className="pages__eventdetail_body_sideright_book">Book Now</button>
                </div>
            </div>

            <div className="pages__eventdetail_relate">
                <h2>More Events</h2>
                <div className="pages__eventdetail_relate_list">
                    {eventData.moreEvents.map((event) => (
                        <div key={event.id} className="pages__eventdetail_relate_list_card">
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <div className="pages__eventdetail_relate_list_card_infor">
                                <p className="pages__eventdetail_relate_list_card_infor_price">{event.price}</p>
                                <p className="pages__eventdetail_relate_list_card_infor_date">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetailPage;
