import { useState, useEffect } from 'react';
import { http, routes } from '@utils/constants';
import { useRouter } from 'next/router';
import { fetchDetailsEvent } from '@redux/actions/api';
import { useDispatch } from 'react-redux';

const SeatType1: ISeatType1Component<ISeatType1ComponentProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id, quantity } = router.query;
    const maxSeats = parseInt(quantity as string, 10) || 0;
    const [state, setState] = useState<ISeatType1ComponentState>({
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        numSeatOfRowLeft: [1, 2, 3, 4],
        numSeatOfRowRight: [5, 6, 7, 8],
        vipRows: ['A', 'B'],
        selectedSeat: [],
        orderedSeats: ['A1', 'C1', 'C2'],
        ticketPrice: 0,
    });

    const { rows, numSeatOfRowLeft, numSeatOfRowRight, vipRows, selectedSeat = [], orderedSeats, ticketPrice = 0 } = state;

    const toggleSeat = (row: string, seatNum: number) => {
        const seatId = `${row}${seatNum}`;
        if (orderedSeats?.includes(seatId)) return;

        setState((prev) => {
            let newSelectedSeats = [...(prev.selectedSeat ?? [])];
            let newTicketPrice = prev.ticketPrice ?? 0;

            if (newSelectedSeats.includes(seatId)) {
                newSelectedSeats = newSelectedSeats.filter((seat) => seat !== seatId);
                newTicketPrice -= vipRows.includes(row) ? 100000 : 75000;
            } else {
                if (newSelectedSeats.length < maxSeats) {
                    newSelectedSeats.push(seatId);
                    newTicketPrice += vipRows?.includes(row) ? 100000 : 75000;
                }
            }

            return {
                ...prev,
                selectedSeat: newSelectedSeats,
                ticketPrice: newTicketPrice,
            };
        });
    };

    useEffect(() => {
        const savedSeats = localStorage.getItem('selectedSeats');
        const savedPrice = localStorage.getItem('ticketPrice');
        if (savedSeats && savedPrice) {
            setState((prev) => ({
                ...prev,
                selectedSeat: JSON.parse(savedSeats),
                ticketPrice: +savedPrice,
            }));
        }
    }, []);

    useEffect(() => {
        if (selectedSeat.length > 0) {
            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeat));
            localStorage.setItem('ticketPrice', ticketPrice.toString());
        } else {
            localStorage.removeItem('selectedSeats');
            localStorage.removeItem('ticketPrice');
        }
        handleDetialsEvent();
    }, [selectedSeat, ticketPrice]);

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

    return (
        <div
            style={{
                backgroundColor: 'black',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div>
                <ul className="components__seattype1-seattitle">
                    <li className="components__seattype1-row text-white">
                        <div className="components__seattype1-seat empty"></div>
                        <small className="font-thin text-xl">Empty</small>
                    </li>
                    <li className="components__seattype1-row text-white">
                        <div className="components__seattype1-seat vip"></div>
                        <small className="font-thin text-xl">VIP</small>
                    </li>
                    <li className="components__seattype1-row">
                        <div className="components__seattype1-seat selected"></div>
                        <small className="font-thin text-xl text-white">Selected</small>
                    </li>
                    <li className="components__seattype1-row">
                        <div className="components__seattype1-seat ordered"></div>
                        <small className="font-thin text-xl text-white">Ordered</small>
                    </li>
                </ul>
            </div>
            <div className="components__seattype1-screen">Screen</div>
            <div className="components__seattype1-container">
                <div className="components__seattype1-column">
                    {rows?.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <div className="components__seattype1-row-label">{row}</div>
                            <div className="components__seattype1-row-seats">
                                {numSeatOfRowLeft?.map((seatNum) => {
                                    const seatId = `${row}${seatNum}`;
                                    const isVIP = vipRows?.includes(row);
                                    const isSelected = selectedSeat?.includes(seatId);
                                    const isOrdered = orderedSeats?.includes(seatId);
                                    return (
                                        <div
                                            key={seatNum}
                                            className={`components__seattype1-seat ${
                                                isSelected ? 'selected' : isOrdered ? 'ordered' : isVIP ? 'vip' : 'empty'
                                            }`}
                                            onClick={() => toggleSeat(row, seatNum)}
                                        >
                                            {isSelected ? seatId : ''}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="components__seattype1-stage">Stage</div>
                <div className="components__seattype1-column">
                    {rows?.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <div className="components__seattype1-row-label">{row}</div>
                            <div className="components__seattype1-row-seats">
                                {numSeatOfRowRight?.map((seatNum) => {
                                    const seatId = `${row}${seatNum}`;
                                    const isVIP = vipRows?.includes(row);
                                    const isSelected = selectedSeat?.includes(seatId);
                                    const isOrdered = orderedSeats?.includes(seatId);
                                    return (
                                        <div
                                            key={seatNum}
                                            className={`components__seattype1-seat ${
                                                isSelected ? 'selected' : isOrdered ? 'ordered' : isVIP ? 'vip' : 'empty'
                                            }`}
                                            onClick={() => toggleSeat(row, seatNum)}
                                        >
                                            {isSelected ? seatId : ''}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="components__seattype1-info">
                Bạn đang chọn ghế {selectedSeat.join(', ')} - Với giá: {ticketPrice} VND
            </div>
            <button
                onClick={() =>
                    router.push(
                        {
                            pathname: routes.CLIENT.ORDER_PAGES.href,
                            query: { id: id, seatDetails: JSON.stringify(selectedSeat), ticketPrice: ticketPrice },
                        },
                        undefined,
                        { scroll: false },
                    )
                }
            >      Tiếp tục
            </button>
        </div>
    );
};

export default SeatType1;
