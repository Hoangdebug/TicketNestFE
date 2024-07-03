import { IEventDetailPageState, IEventDetailPage, IEventDetailPageProps } from '@interfaces/pages/eventdetail';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdShare } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import { MdOutlinePeople } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { useDispatch } from 'react-redux';
import { fetchDetailsEvent, fetchListEvent } from '@redux/actions/api';
import { http, routes } from '@utils/constants';

const EventDetailPage: IEventDetailPage<IEventDetailPageProps> = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const [state, setState] = useState<IEventDetailPageState>({
        eventDetails: undefined,
        event: [],
    });
    const { eventDetails, event } = state;

    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleDetialsEvent = async () => {
        dispatch(
            await fetchDetailsEvent(id?.toString() ?? '', (res: IEventDataApiRes | IErrorAPIRes | null) => {
                if (res && res.code === http.SUCCESS_CODE) {
                    const event = (res as IEventDataApiRes).result;
                    setState((prevState) => ({
                        ...prevState,
                        eventDetails: event,
                    }));
                }
            }),
        );
    };

    const handleFetchListEvents = async () => {
        dispatch(
            await fetchListEvent((res: IEventDataApiListRes | IErrorAPIRes | null) => {
                if (res && res?.code === http.SUCCESS_CODE) {
                    const data = (res as IEventDataApiListRes).result;
                    setState((prevState) => ({
                        ...prevState,
                        event: data,
                    }));
                }
            }),
        );
    };

    useEffect(() => {
        handleDetialsEvent();
        handleFetchListEvents();
    }, []);

    return (
        <div className="pages__eventdetail container">
            <div className="pages__eventdetail_headers">
                <div className="pages__eventdetail_headers_sideleft col-md-2">
                    <h4>APR</h4>
                    <h4>30</h4>
                </div>
                <div className="pages__eventdetail_headers_sideright col-md-10">
                    <h2>{eventDetails?.name}</h2>
                    <div className="pages__eventdetail_headers_sideright_param">
                        <IoLocationOutline />
                        {/* <p>
                            {' '}
                            {eventData.destination}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {eventData.date}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {eventData.time}h
                        </p> */}
                    </div>
                </div>
            </div>
            <div className="pages__eventdetail_body">
                <div className="pages__eventdetail_body_sideleft col-md-8">
                    <div className="pages__eventdetail_body_sideleft_image">
                        <img src={eventDetails?.image} alt="Event Image" />
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
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventDetails?.day_start}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">DAYS</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventDetails?.day_start}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">HOURS</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventDetails?.day_start}</span>
                            <span className="pages__eventdetail_body_sideright_count_item_label">MINUTES</span>
                        </div>
                        <div className="pages__eventdetail_body_sideright_count_item">
                            <span className="pages__eventdetail_body_sideright_count_item_value">{eventDetails?.day_start}</span>
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
                        <div className="pages__eventdetail_body_sideright_seat_price">{eventDetails?.price}</div>
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
                    {event?.map((events) => (
                        <div
                            onClick={() =>
                                router.push({ pathname: routes.CLIENT.EVENT_DETAILS.href, query: { id: events._id } }, undefined, {
                                    scroll: false,
                                })
                            }
                            key={events?._id}
                            className="pages__eventdetail_relate_list_card"
                        >
                            <img src={events.image} alt={events?.name} />
                            <h3>{events?.name}</h3>
                            <div className="pages__eventdetail_relate_list_card_infor">
                                <p className="pages__eventdetail_relate_list_card_infor_price">{events?.price}</p>
                                <p className="pages__eventdetail_relate_list_card_infor_date">{events?.day_start}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetailPage;
