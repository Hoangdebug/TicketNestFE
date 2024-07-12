import { useState } from 'react';
import moment from 'moment';

const PaymentPage = () => {
  const [ticketInfo, setTicketInfo] = useState({
    name: 'Nguyễn Trần Thế Anh',
    phone: '+84358446865',
    email: 'theanhntp@gmail.com',
    eventLocation: '36 Lê Quý Đôn, Phường 06, Quận 3, Thành Phố Hồ Chí Minh',
    eventTime: moment('2024-07-13T16:30:00').format('HH:mm, DD MMMM, YYYY'),
    ticketType: 'Sương Sớm',
    ticketPrice: 260000,
    seatNumber: 'E-21',
    quantity: 1,
  });

  return (
    <div className="components__payment">
      <div className="components__payment-header">
        <h1>THANH TOÁN</h1>
        <p>{ticketInfo.eventLocation}</p>
        <p>{ticketInfo.eventTime}</p>
      </div>
      <div className="components__payment-content">
        <div className="components__payment-content-left">
          <div className="components__payment-content-info">
            <h2>Thông tin nhận vé</h2>
            <div className="components__payment-content-ticket-info">
              <p>{ticketInfo.name}</p>
              <p>{ticketInfo.phone}</p>
              <p>{ticketInfo.email}</p>
            </div>
          </div>
          <div className="components__payment-content-info">
            <h2>Thông tin đặt vé</h2>
            <div className="components__payment-content-ticket-details">
              <span>Loại vé</span>
              <span>{ticketInfo.ticketType}</span>
            </div>
            <div className="components__payment-content-ticket-details">
              <span>Số lượng</span>
              <span>{ticketInfo.quantity}</span>
            </div>
            <div className="components__payment-content-ticket-details">
              <span>Ghế</span>
              <span>{ticketInfo.seatNumber}</span>
            </div>
            <div className="components__payment-content-ticket-details">
              <span>Tạm tính</span>
              <span>{ticketInfo.ticketPrice} đ</span>
            </div>
          </div>
        </div>
        <div className="components__payment-content-right">
          <div className="components__payment-content-method">
            <h2>Phương thức thanh toán</h2>
            <div>
              <input type="radio" id="momo" name="payment" />
              <label htmlFor="momo">Ví Momo</label>
            </div>
            <div>
              <input type="radio" id="credit-card" name="payment" />
              <label htmlFor="credit-card">Thẻ thanh toán quốc tế</label>
            </div>
            <div>
              <input type="radio" id="atm" name="payment" />
              <label htmlFor="atm">Thẻ ATM/Internet Banking</label>
            </div>
          </div>
          <div className="components__payment-content-order-info">
            <h2>Thông tin đơn hàng</h2>
            <div className="components__payment-content-order-details">
              <span>Tạm tính</span>
              <span>{ticketInfo.ticketPrice} đ</span>
            </div>
            <div className="components__payment-content-order-total">
              <span>Tổng tiền</span>
              <span>{ticketInfo.ticketPrice} đ</span>
            </div>
            <button className="components__payment-content-button">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
