import { useState, useEffect } from 'react';

const SeatType1: ISeatType1Component<ISeatType1ComponentProps> = () => {
    const [state, setState] = useState<ISeatType1ComponentState>({
        rows: [],
        numSeatOfRowLeft: [],
        numSeatOfRowRight: [],
        vipRows: [],
        selectedSeat: null,
        orderedSeats: [],
        ticketPrice: 0,
    });

    const { rows, numSeatOfRowLeft, numSeatOfRowRight, vipRows, selectedSeat, orderedSeats, ticketPrice } = state;

    useEffect(() => {
        populateUI();
    }, []);

    const toggleSeat = (row: string, seatNum: number) => {
        const seatId = `${row}${seatNum}`;
        if (orderedSeats?.includes(seatId)) return;

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
                ticketPrice: vipRows?.includes(row) ? 100000 : 75000,
            }));
        }
    };

    const populateUI = () => {
        const savedSeat = localStorage.getItem('selectedSeat');
        const savedPrice = localStorage.getItem('ticketPrice');
        if (savedSeat) {
            setState((prev) => ({
                ...prev,
                selectedSeat: savedSeat,
            }));
        }
        if (savedPrice) {
            setState((prev) => ({
                ...prev,
                ticketPrice: +savedPrice,
            }));
        }
    };

    useEffect(() => {
        localStorage.setItem('selectedSeat', selectedSeat || '');
        localStorage.setItem('ticketPrice', ticketPrice);
    }, [selectedSeat, ticketPrice]);

    return (
        <div className="components__seattype1">
            <div className="components__seattype1-screen">Screen</div>
            <div className="mt-10 flex flex-col justify-center items-center w-[900px] h-[500px] gap-10">
                <div className="w-full flex justify-center items-start gap-10">
                    <div className="flex flex-col justify-start items-center gap-1">
                        {rows?.map((row) => (
                            <div key={row} className="w-[98%] h-[50px] flex items-center justify-start">
                                <span className="w-10 text-white">{row}</span>
                                <div className="flex justify-around items-center">
                                    {numSeatOfRowLeft?.map((seatNum) => {
                                        const seatId = `${row}${seatNum}`;
                                        const isVIP = vipRows?.includes(row);
                                        const isSelected = selectedSeat === seatId;
                                        const isOrdered = orderedSeats?.includes(seatId);
                                        return (
                                            <div
                                                key={seatNum}
                                                className={`components__seattype1-seat min-h-[30px] cursor-pointer min-w-[35px] m-[5px] rounded-t-2xl flex justify-center items-center ${
                                                    isSelected
                                                        ? 'bg-green-500 text-white'
                                                        : isOrdered
                                                        ? 'bg-white'
                                                        : isVIP
                                                        ? 'bg-yellow-500'
                                                        : 'bg-slate-800'
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
                    <div className="flex flex-col justify-start items-center gap-1">
                        {rows?.map((row) => (
                            <div key={row} className="w-[98%] h-[50px] flex items-center justify-start">
                                <span className="w-10 text-white">{row}</span>
                                <div className="flex justify-around items-center">
                                    {numSeatOfRowRight?.map((seatNum) => {
                                        const seatId = `${row}${seatNum}`;
                                        const isVIP = vipRows?.includes(row);
                                        const isSelected = selectedSeat === seatId;
                                        const isOrdered = orderedSeats?.includes(seatId);
                                        return (
                                            <div
                                                key={seatNum}
                                                className={`components__seattype1-seat min-h-[30px] cursor-pointer min-w-[35px] m-[5px] rounded-t-2xl flex justify-center items-center ${
                                                    isSelected
                                                        ? 'bg-green-500 text-white'
                                                        : isOrdered
                                                        ? 'bg-white'
                                                        : isVIP
                                                        ? 'bg-yellow-500'
                                                        : 'bg-slate-800'
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
            </div>
            {selectedSeat && (
                <div className="text-white mt-5">
                    Ghế {selectedSeat} đang được chọn - Với giá: {ticketPrice} VND
                </div>
            )}
        </div>
    );
};

export default SeatType1;
