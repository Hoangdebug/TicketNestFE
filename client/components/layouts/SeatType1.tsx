import { useState, useEffect } from 'react';

interface ISeatType1ComponentState {
    rows: string[];
    numSeatOfRowLeft: number[];
    numSeatOfRowRight: number[];
    vipRows: string[];
    selectedSeat: string | null;
    orderedSeats: string[];
    ticketPrice: number;
}

const SeatType1 = () => {
    const [state, setState] = useState<ISeatType1ComponentState>({
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        numSeatOfRowLeft: [1, 2, 3, 4],
        numSeatOfRowRight: [5, 6, 7, 8],
        vipRows: ['A', 'B'],
        selectedSeat: null,
        orderedSeats: ['A1', 'C1', 'C2'],
        ticketPrice: 0,
    });

    const { rows, numSeatOfRowLeft, numSeatOfRowRight, vipRows, selectedSeat, orderedSeats, ticketPrice } = state;

    const toggleSeat = (row: string, seatNum: number) => {
        const seatId = `${row}${seatNum}`;
        if (orderedSeats.includes(seatId)) return;

        if (selectedSeat === seatId) {
            setState((prev) => ({
                ...prev,
                selectedSeat: null,
                ticketPrice: 0,
            }));
        } else {
            setState((prev) => ({
                ...prev,
                selectedSeat: seatId,
                ticketPrice: vipRows.includes(row) ? 100000 : 75000,
            }));
        }
    };

    useEffect(() => {
        const savedSeat = localStorage.getItem('selectedSeat');
        const savedPrice = localStorage.getItem('ticketPrice');
        if (savedSeat && savedPrice) {
            setState((prev) => ({
                ...prev,
                selectedSeat: savedSeat,
                ticketPrice: +savedPrice,
            }));
        }
    }, []);

    useEffect(() => {
        if (selectedSeat) {
            localStorage.setItem('selectedSeat', selectedSeat);
            localStorage.setItem('ticketPrice', ticketPrice.toString());
        } else {
            localStorage.removeItem('selectedSeat');
            localStorage.removeItem('ticketPrice');
        }
    }, [selectedSeat, ticketPrice]);

    return (
        <div style={{
            backgroundColor: 'black',
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
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
                    {rows.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <div className="components__seattype1-row-label">{row}</div>
                            <div className="components__seattype1-row-seats">
                                {numSeatOfRowLeft.map((seatNum) => {
                                    const seatId = `${row}${seatNum}`;
                                    const isVIP = vipRows.includes(row);
                                    const isSelected = selectedSeat === seatId;
                                    const isOrdered = orderedSeats.includes(seatId);
                                    return (
                                        <div
                                            key={seatNum}
                                            className={`components__seattype1-seat ${isSelected ? 'selected' : isOrdered ? 'ordered' : isVIP ? 'vip' : 'empty'
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
                    {rows.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <div className="components__seattype1-row-label">{row}</div>
                            <div className="components__seattype1-row-seats">
                                {numSeatOfRowRight.map((seatNum) => {
                                    const seatId = `${row}${seatNum}`;
                                    const isVIP = vipRows.includes(row);
                                    const isSelected = selectedSeat === seatId;
                                    const isOrdered = orderedSeats.includes(seatId);
                                    return (
                                        <div
                                            key={seatNum}
                                            className={`components__seattype1-seat ${isSelected ? 'selected' : isOrdered ? 'ordered' : isVIP ? 'vip' : 'empty'
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
                Bạn đang chọn ghế {selectedSeat} - Với giá: {ticketPrice} VND
            </div>
            <button>
                Tiếp tục
            </button>
        </div>
    );
};

export default SeatType1;
