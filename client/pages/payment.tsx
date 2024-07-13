import { ISeatType1Page, ISeatType1PageProps } from '@interfaces/pages/seattype1';
import { IEventDetailPageState } from '@interfaces/pages/eventdetail';
import { http, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDetailsEvent } from '@redux/actions/api';
import moment from 'moment';

const Payment = () => {
  const router = useRouter();
  const { id, seatDetails, ticketPrice } = router.query;
  const token = authHelper.accessToken();
  const dispatch = useDispatch();

  const [state, setState] = useState<IEventDetailPageState>({
    eventDetails: undefined,
    event: [],
});

  const [countdown, setCountdown] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDisabled(true);
      setShowPopup(true);
    }
  }, [countdown]);

  let parsedSeatDetails = [];

  if (seatDetails) {
    try {
      parsedSeatDetails = Array.isArray(seatDetails) ? seatDetails : JSON.parse(seatDetails);
    } catch (error) {
      console.error('Error parsing seat details:', error);
    }
  }

  const formattedSeatDetails = parsedSeatDetails.join(', ');
  const seatCount = parsedSeatDetails.length;

  const handleClose = () => {
    setShowPopup(false);
    // Redirect to rebook tickets
    router.push(
      { pathname: routes.CLIENT.ORDER_PAGES.href, query: { id, seatCount, formattedSeatDetails, seatDetails, ticketPrice } },
      undefined,
      { scroll: false },
  )
  };

  return (
    <div className="components__payment">
      <div className="components__payment-header">
        <h1>{eventDetails?.name}</h1>
        <p>{eventDetails?.event_type}</p>
        <p>{eventDetails?.location}</p>
        <p>{formattedDayEnd}</p>
      </div>
      <div className="components__payment-timer">
        <span>Hoàn tất đặt vé trong</span>
        <div className="components__payment-timer--countdown">
          <span>{String(Math.floor(countdown / 60)).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(countdown % 60).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="components__payment-paymentSection">
        <div className="components__payment-paymentSection-left">
          <div className="components__payment-paymentSection-ticketInfo">
            <h2>Thông tin nhận vé</h2>
            <p>Nguyễn Trần Thế Anh +84358446665</p>
            <p>theanhntp@gmail.com</p>
          </div>
          <div className="components__payment-paymentSection-paymentMethods">
            <h2>Phương thức thanh toán</h2>
            <div className="components__payment-paymentSection-method">
              <input type="radio" id="momo" name="payment" value="momo" />
              <label>Ví Momo</label>
            </div>
            <div className="components__payment-paymentSection-method">
              <input type="radio" id="visa" name="payment" value="visa" />
              <label>Thẻ thanh toán quốc tế</label>
            </div>
            <div className="components__payment-paymentSection-method">
              <input type="radio" id="atm" name="payment" value="atm" />
              <label>Thẻ ATM/ Internet Banking</label>
            </div>
          </div>
        </div>
        <div className="components__payment-paymentSection-right">
          <div className="components__payment-paymentSection-orderInfo">
            <h2>Thông tin đặt vé</h2>
            <p>Ghế: {formattedSeatDetails}</p>
            <p>Số lượng: {seatCount}</p>
            <p>Giá: {ticketPrice}</p>
          </div>
          <div className="components__payment-paymentSection-promotion">
            <input type="text" placeholder="MÃ GIẢM GIÁ" />
            <button>Áp dụng</button>
          </div>
          <div className="components__payment-paymentSection-total">
            <h2>Thông tin đơn hàng</h2>
            <p>Tạm tính: {ticketPrice}</p>
            <p>Tổng tiền: {ticketPrice}</p>
          </div>
          <button className="components__payment-paymentSection-payButton" disabled={isDisabled}>Thanh toán</button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-modal">
          <div className="popup-modal-content">
            <span className="popup-modal-close" onClick={handleClose}>&times;</span>
            <h2>Hết thời gian giữ vé!</h2>
            <p>Đã hết thời gian giữ vé. Vui lòng đặt lại vé mới.</p>
            <button onClick={handleClose}>Đặt vé mới</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
