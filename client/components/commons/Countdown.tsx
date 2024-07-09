import { useState, useEffect } from 'react';
import moment from 'moment';

const Countdown: ICountdownComponent<ICountdownComponentProps> = ({ dayEnd }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const endTime = moment(dayEnd);
            const now = moment();
            const difference = moment.duration(endTime.diff(now));

            if (difference.asMilliseconds() >= 0) {
                setTimeLeft({
                    days: difference.days(),
                    hours: difference.hours(),
                    minutes: difference.minutes(),
                    seconds: difference.seconds(),
                });
            } else {
                clearInterval(intervalId);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dayEnd]);

    return (
        <div className="pages__eventdetail_body_sideright_count">
            <div className="pages__eventdetail_body_sideright_count_item">
                <span className="pages__eventdetail_body_sideright_count_item_value">{timeLeft.days}</span>
                <span className="pages__eventdetail_body_sideright_count_item_label">DAYS</span>
            </div>
            <div className="pages__eventdetail_body_sideright_count_item">
                <span className="pages__eventdetail_body_sideright_count_item_value">{timeLeft.hours}</span>
                <span className="pages__eventdetail_body_sideright_count_item_label">HOURS</span>
            </div>
            <div className="pages__eventdetail_body_sideright_count_item">
                <span className="pages__eventdetail_body_sideright_count_item_value">{timeLeft.minutes}</span>
                <span className="pages__eventdetail_body_sideright_count_item_label">MINUTES</span>
            </div>
            <div className="pages__eventdetail_body_sideright_count_item">
                <span className="pages__eventdetail_body_sideright_count_item_value">{timeLeft.seconds}</span>
                <span className="pages__eventdetail_body_sideright_count_item_label">SECONDS</span>
            </div>
        </div>
    );
};

export default Countdown;
