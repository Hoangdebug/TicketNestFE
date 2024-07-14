import { ISeatType1Page, ISeatType1PageProps } from '@interfaces/pages/seattype1';
import { IEventDetailPageState } from '@interfaces/pages/eventdetail';
import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDetailsEvent } from '@redux/actions/api';
import moment from 'moment';

const OrderPage: ISeatType1Page<ISeatType1PageProps> = () => {
    const router = useRouter();
    const { id, seatDetails, ticketPrice } = router.query;
    const token = authHelper.accessToken();
    const dispatch = useDispatch();

    const [state, setState] = useState<IEventDetailPageState>({
        eventDetails: undefined,
        event: [],
    });

    const { eventDetails, event } = state;
    const formattedDayEnd = moment(eventDetails?.day_end).format('MMM DD, YYYY HH:mm:ss');

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

    useEffect(() => {
        if (!token) {
            router.push(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
        }
        handleDetialsEvent();
    }, []);

    let parsedSeatDetails: string[] = [];

    if (seatDetails) {
        try {
            parsedSeatDetails = Array.isArray(seatDetails) ? seatDetails : JSON.parse(seatDetails as string);
        } catch (error) {
            console.error('Error parsing seat details:', error);
        }
    }

    const formattedSeatDetails = parsedSeatDetails.join(', ');
    const seatCount = parsedSeatDetails.length;

    return (
        <>
            <div className="components__seattype1">
                <div className="components__seattype1-details">
                    <span>Event: {eventDetails?.name}</span>
                    <span>Location: {eventDetails?.location}</span>
                    <span>Time: {formattedDayEnd}</span>
                    <span>Ghế: {formattedSeatDetails}</span>
                </div>
                <div className="components__order-form-and-ticket-info">
                    <div className="components__order-form-container">
                        <h2 className="components__order-form-title">BẢNG CÂU HỎI</h2>
                        <form>
                            <label className="components__order-form-label">* Họ tên của bạn là gì?</label>
                            <input className="components__order-form-input" />

                            <label className="components__order-form-label">* Email của bạn là gì?</label>
                            <input className="components__order-form-input" />

                            <label className="components__order-form-checkbox-label">
                                <input className="components__order-form-checkbox" type="checkbox" />
                                Tôi đồng ý với các điều khoản
                            </label>

                            <label className="components__order-form-checkbox-label">
                                <input className="components__order-form-checkbox" type="checkbox" />
                                Tôi đồng ý nhận các thông tin và ưu đãi qua email và điện thoại
                            </label>

                            <label className="components__order-form-label" htmlFor="phone">
                                * Số điện thoại của bạn là gì?
                            </label>
                            <input className="components__order-form-input" />
                        </form>
                    </div>
                    <div className="components__order-ticket-info">
                        <h2 className="components__order-ticket-title">Thông tin đặt vé</h2>
                        <div className="components__order-ticket-item">
                            <label className="components__order-ticket-label">Loại vé</label>
                            <span className="components__order-ticket-value">{eventDetails?.event_type}</span>
                        </div>
                        <div className="components__order-ticket-item">
                            <label className="components__order-ticket-label">Số lượng</label>
                            <span className="components__order-ticket-value">{seatCount}</span>
                        </div>
                        <div className="components__order-ticket-item">
                            <label className="components__order-ticket-label">Ghế</label>
                            <span className="components__order-ticket-value">{formattedSeatDetails}</span>
                        </div>
                        <div className="components__order-ticket-item">
                            <label className="components__order-ticket-label">Tạm tính {seatCount} ghế</label>
                            <span className="components__order-ticket-value">{ticketPrice} đ</span>
                        </div>
                        <button
                            className="components__order-form-button"
                            onClick={() =>
                                router.push(
                                    {
                                        pathname: routes.CLIENT.PAYMENT_PAGE.href,
                                        query: { id, seatCount, formattedSeatDetails, seatDetails, ticketPrice },
                                    },
                                    undefined,
                                    { scroll: false },
                                )
                            }
                        >
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPage;
