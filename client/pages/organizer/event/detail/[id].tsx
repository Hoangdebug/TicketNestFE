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
import Countdown from '@components/commons/Countdown';
import moment from 'moment';

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
    const totalMoney = quantity * (eventDetails?.price ?? 0);
    const slicedEvents = event?.slice(0, 4);
    const formattedDayStart = moment(eventDetails?.day_start).format('MMM DD, YYYY HH:mm:ss');
    const formattedDayEnd = moment(eventDetails?.day_end).format('MMM DD, YYYY HH:mm:ss');
    const dayStart = moment(formattedDayEnd).format('DD');
    const monthStart = moment(formattedDayEnd).format('MMM');

    const handleDetailsEvent = async () => {
        dispatch(
            await fetchDetailsEvent(id?.toString() ?? '', (res: IEventDataApiRes | IErrorAPIRes | null) => {
                if (res && res.code === http.SUCCESS_CODE) {
                    const event = (res as IEventDataApiRes).result?.dataEvent;
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
                    const data = (res as IEventDataApiListRes).result?.dataEvent;
                    setState((prevState) => ({
                        ...prevState,
                        event: data,
                    }));
                }
            }),
        );
    };

    useEffect(() => {
        handleDetailsEvent();
        handleFetchListEvents();
    }, []);

    return (
        <div className="pages__eventdetail container">
            <div className="pages__eventdetail_headers">
                <div className="pages__eventdetail_headers_sideleft col-md-2">
                    <h4>{monthStart}</h4>
                    <h4>{dayStart}</h4>
                </div>
                <div className="pages__eventdetail_headers_sideright col-md-10">
                    <h2>{eventDetails?.name}</h2>
                    <div className="pages__eventdetail_headers_sideright_param">
                        <IoLocationOutline />
                        <p>
                            {eventDetails?.location}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {formattedDayStart}
                            <span className="pages__eventdetail_headers_sideright_param_separator">•</span>
                            {formattedDayEnd}
                        </p>
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
                        <h2>About This Event</h2>
                        <p>{eventDetails?.description}</p>
                    </div>
                </div>

                <div className="pages__eventdetail_body_sideright col-md-4">
                    <div className="pages__eventdetail_body_sideright_titles">
                        <h3>Event Details</h3>
                    </div>

                    <div className="pages__eventdetail_body_sideright_line"></div>

                    <Countdown dayEnd={eventDetails?.day_end ?? ''} />

                    <div className="pages__eventdetail_body_sideright_infor">
                        <div className="pages__eventdetail_body_sideright_infor_item">
                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <MdOutlinePeople className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Organised by</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">
                                        {eventDetails?.created_by?.name}
                                    </span>
                                    <a href="#" className="pages__eventdetail_body_sideright_infor_item_sec_link">
                                        View Profile
                                    </a>
                                </div>
                            </div>

                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <SlCalender className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Date and Time</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">{formattedDayEnd}</span>
                                    <a href="#" className="pages__eventdetail_body_sideright_infor_item_sec_link">
                                        Add to Calendar
                                    </a>
                                </div>
                            </div>

                            <div className="pages__eventdetail_body_sideright_infor_item_sec">
                                <IoLocationOutline className="pages__eventdetail_body_sideright_infor_item_sec_icon col-md-2" />
                                <div className="pages__eventdetail_body_sideright_infor_item_sec_text col-md-10">
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_label">Location</span>
                                    <span className="pages__eventdetail_body_sideright_infor_item_sec_value">{eventDetails?.location}</span>
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
                        <div className="pages__eventdetail_body_sideright_seat_price">{eventDetails?.price} $</div>
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
                        <span>{quantity}x Ticket(s)</span>
                        <span className="pages__eventdetail_body_sideright_actions_total">AUD ${totalMoney}</span>
                    </div>
                    <button
                        className="pages__eventdetail_body_sideright_book"
                        onClick={() =>
                            router.push(
                                { pathname: routes.CLIENT.EVENT_DETAILS_PAGES.href, query: { id: id, quantity: quantity } },
                                undefined,
                                { scroll: false },
                            )
                        }
                    >
                        Book Now
                    </button>
                </div>
            </div>

            <div className="pages__eventdetail_relate">
                <h2>More Events</h2>
                <div className="pages__eventdetail_relate_list">
                    {slicedEvents?.map((events) => (
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
                                <p className="pages__eventdetail_relate_list_card_infor_price">{events?.price} $</p>
                                <p className="pages__eventdetail_relate_list_card_infor_date">{formattedDayEnd}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default EventDetailPage;
