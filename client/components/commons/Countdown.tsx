import { useState, useEffect } from 'react';
import { differenceInSeconds, parse } from 'date-fns';

const Countdown: ICountdownComponent<ICountdownComponentProps> = ({ dayEnd }) => {
    const calculateTimeLeft = () => {
        const end = parse(dayEnd, 'yyyy-MM-dd HH:mm:ss', new Date());
        const now = new Date();
        const timeDiff = differenceInSeconds(end, now);

        const days = Math.floor(timeDiff / (60 * 60 * 24));
        const hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
        const seconds = Math.floor(timeDiff % 60);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
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
