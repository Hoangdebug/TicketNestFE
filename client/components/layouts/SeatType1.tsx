import { useState } from 'react';
import { useRouter } from 'next/router';

const SeatType1: React.FC = () => {
    const router = useRouter();
    const { id, quantity } = router.query;
    const maxSeats = parseInt(quantity as string, 10) || 0;

    const [state, setState] = useState({
        rowsLeft: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
        rowsMiddle: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        rowsRight: ['A', 'B', 'C', 'D', 'E', 'F'],
        numSeatsLeft: [15, 13, 11, 9, 7, 5, 3, 1],
        numSeatsMiddle: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
        numSeatsRight: [24, 26, 28, 30],
        vipRows: ['A', 'B'],
        selectedSeat: [],
        orderedSeats: ['A1', 'B3', 'C2', 'D4'],
        ticketPrice: 0,
        scale: 1, // Giá trị scale cho zoom in và zoom out
    });

    const toggleSeat = (row: string, seatNum: number, section: string) => {
        const seatId = `${section}-${row}${seatNum}`;
        if (state.orderedSeats.includes(seatId)) return;

        setState((prevState) => {
            let newSelectedSeats = [...prevState.selectedSeat];
            let newTicketPrice = prevState.ticketPrice;

            if (newSelectedSeats.includes(seatId)) {
                newSelectedSeats = newSelectedSeats.filter((seat) => seat !== seatId);
                newTicketPrice -= prevState.vipRows.includes(row) ? 400000 : 330000;
            } else {
                if (newSelectedSeats.length < maxSeats) {
                    newSelectedSeats.push(seatId);
                    newTicketPrice += prevState.vipRows.includes(row) ? 400000 : 330000;
                }
            }

            return {
                ...prevState,
                selectedSeat: newSelectedSeats,
                ticketPrice: newTicketPrice,
            };
        });
    };

    const zoomIn = () => {
        setState((prevState) => ({
            ...prevState,
            scale: prevState.scale + 0.2, // Tăng giá trị zoom in
        }));
    };

    const zoomOut = () => {
        setState((prevState) => ({
            ...prevState,
            scale: prevState.scale - 0.2 > 0.5 ? prevState.scale - 0.2 : 0.5, // Giảm giá trị zoom out
        }));
    };

    return (
        <div className="components__seattype1">
            <div className="components__seattype1-screen">SÂN KHẤU</div>

            {/* Nút zoom in và zoom out */}
            <div className="components__seattype1-zoom-controls">
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>

            {/* Thêm phần mô tả trạng thái ghế */}
            <div className="components__seattype1-legend">
                <div className="legend-item">
                    <div className="legend-circle available"></div> Đang trống
                </div>
                <div className="legend-item">
                    <div className="legend-circle selected"></div> Đang chọn
                </div>
                <div className="legend-item">
                    <div className="legend-circle ordered"></div> Không chọn được
                </div>
            </div>

            <div
                className="components__seattype1-container"
                style={{ transform: `scale(${state.scale})`, transition: 'transform 0.3s ease-in-out' }} // Áp dụng zoom
            >
                {/* Khu vực bên trái */}
                <div className="components__seattype1-section left">
                    {state.rowsLeft.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <span className="components__seattype1-rowLabel">{row}</span>
                            {state.numSeatsLeft.map((seatNum) => (
                                <div
                                    key={seatNum}
                                    className={`components__seattype1-seat ${
                                        state.orderedSeats.includes(`${row}${seatNum}`)
                                            ? 'ordered'
                                            : state.selectedSeat.includes(`${row}${seatNum}`)
                                            ? 'selected'
                                            : 'available'
                                    }`}
                                    onClick={() => toggleSeat(row, seatNum, 'left')}
                                >
                                    {seatNum}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Khu vực giữa */}
                <div className="components__seattype1-section middle">
                    {state.rowsMiddle.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <span className="components__seattype1-rowLabel">{row}</span>
                            {state.numSeatsMiddle.map((seatNum) => (
                                <div
                                    key={seatNum}
                                    className={`components__seattype1-seat ${
                                        state.orderedSeats.includes(`${row}${seatNum}`)
                                            ? 'ordered'
                                            : state.selectedSeat.includes(`${row}${seatNum}`)
                                            ? 'selected'
                                            : 'available'
                                    }`}
                                    onClick={() => toggleSeat(row, seatNum, 'middle')}
                                >
                                    {seatNum}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Khu vực bên phải */}
                <div className="components__seattype1-section right">
                    {state.rowsRight.map((row) => (
                        <div key={row} className="components__seattype1-row">
                            <span className="components__seattype1-rowLabel">{row}</span>
                            {state.numSeatsRight.map((seatNum) => (
                                <div
                                    key={seatNum}
                                    className={`components__seattype1-seat ${
                                        state.orderedSeats.includes(`${row}${seatNum}`)
                                            ? 'ordered'
                                            : state.selectedSeat.includes(`${row}${seatNum}`)
                                            ? 'selected'
                                            : 'available'
                                    }`}
                                    onClick={() => toggleSeat(row, seatNum, 'right')}
                                >
                                    {seatNum}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="components__seattype1-info">
                Bạn đã chọn: {state.selectedSeat.join(', ')} - Tổng giá: {state.ticketPrice} VND
            </div>
            <button
                onClick={() => router.push('/checkout', { query: { seatDetails: state.selectedSeat, ticketPrice: state.ticketPrice } })}
            >
                Tiếp tục
            </button>
        </div>
    );
};

export default SeatType1;
