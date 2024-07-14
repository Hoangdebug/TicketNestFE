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
        <div className="payment-container">
            <div className="payment-header">
                <h1>THANH TOÁN</h1>
                <p>{ticketInfo.eventLocation}</p>
                <p>{ticketInfo.eventTime}</p>
            </div>
            <div className="payment-content">
                <div className="ticket-info">
                    <h2>Thông tin đặt vé</h2>
                    <div className="ticket-details">
                        <span>Loại vé</span>
                        <span>{ticketInfo.ticketType}</span>
                    </div>
                    <div className="ticket-details">
                        <span>Số lượng</span>
                        <span>{ticketInfo.quantity}</span>
                    </div>
                    <div className="ticket-details">
                        <span>Ghế</span>
                        <span>{ticketInfo.seatNumber}</span>
                    </div>
                    <div className="ticket-details">
                        <span>Tạm tính</span>
                        <span>{ticketInfo.ticketPrice} đ</span>
                    </div>
                </div>
                <div className="payment-method">
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
                <div className="order-info">
                    <h2>Thông tin đơn hàng</h2>
                    <div className="order-details">
                        <span>Tạm tính</span>
                        <span>{ticketInfo.ticketPrice} đ</span>
                    </div>
                    <div className="order-total">
                        <span>Tổng tiền</span>
                        <span>{ticketInfo.ticketPrice} đ</span>
                    </div>
                    <button className="payment-button">Thanh toán</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
