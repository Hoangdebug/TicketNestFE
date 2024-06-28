import { createRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

import Img from '@components/commons/Img';

import { images } from '@utils/constants';
import { dateHelper, stringHelper, validateHelper } from '@utils/helpers';

const Timepicker: ITimepickerComponent<ITimepickerComponentProps> = (props) => {
    const {
        className,
        fontSize,
        timeFormat,
        width,
        timeIntervals,
        placeHolder,
        onChange,
        onBlur,
        value,
        minTime,
        maxTime,
        innerClassName,
    } = props;
    const timeRef = createRef<ReactDatePicker>();

    const filterPassedTime = (timeValue: Date) => {
        if (minTime || maxTime) {
            const min = validateHelper.isDateTime(dateHelper.formatDate(minTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss'))
                ? dateHelper.formatDate(minTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss')
                : '';
            let max = validateHelper.isDateTime(dateHelper.formatDate(maxTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss'))
                ? dateHelper.formatDate(maxTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss')
                : '';
            if (max.includes('00:00:00') && !min) {
                max = max.replace('00:00:00', '23:59:59');
            }
            if (min && !max) {
                const selected = `${dateHelper.formatDate(minTime?.toISOString() ?? '', 'YYYY-MM-DD')} ${dateHelper.formatDate(
                    timeValue?.toISOString() ?? '',
                    'HH:mm:ss',
                )}`;
                return dateHelper.compareDateSameOrAfter(selected, min);
            }
            if (!min && max) {
                const selected = `${dateHelper.formatDate(maxTime?.toISOString() ?? '', 'YYYY-MM-DD')} ${dateHelper.formatDate(
                    timeValue?.toISOString() ?? '',
                    'HH:mm:ss',
                )}`;

                return dateHelper.compareDateSameOrBefore(selected, max);
            }
        }
        return true;
    };

    const handleOnBlur = (val: string) => {
        const input = stringHelper.formatHalfWidthText(val);
        const freeTypeTime = dateHelper.formatTimeFromText(value ? value : dateHelper.getDate(), input, 'free');
        if (onChange) {
            if (freeTypeTime) {
                onChange(freeTypeTime);
            } else if (input && validateHelper.isNumber(input) && input.length === 4) {
                const dateTime = dateHelper.formatTimeFromText(value ? value : dateHelper.getDate(), input);
                if (dateTime) {
                    if (filterPassedTime(dateTime)) {
                        onChange(dateTime);
                    } else {
                        onChange(dateHelper.getDate());
                    }
                } else {
                    onChange(dateHelper.getDate());
                }
            } else if (input !== '') {
                onChange(dateHelper.getDate());
            }
        }
    };

    const handleSelectCurrentTime = () => {
        if (!value) {
            const timeList = document.querySelectorAll('.react-datepicker__time-list > .react-datepicker__time-list-item');
            const currentTime = dateHelper.formatDate(dateHelper.getDate()?.toISOString() ?? '', 'HH:mm');
            const maxTimeSelected = dateHelper.formatDate(maxTime?.toISOString() ?? '', 'HH:mm');
            const maxTimeHighLight = validateHelper.isDateTime(dateHelper.formatDate(maxTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss'))
                ? dateHelper.formatDate(maxTime?.toISOString() ?? '', 'YYYY-MM-DD HH:mm:ss')
                : '';
            Array.from(timeList).map((item) => {
                if (
                    ((maxTimeHighLight && dateHelper.compareDateBefore(currentTime, maxTimeHighLight)) || !maxTimeHighLight) &&
                    item.innerHTML === currentTime
                ) {
                    item.classList.add('react-datepicker__time-list-item--selected');
                }
                if (
                    maxTimeHighLight &&
                    !dateHelper.compareDateBefore(currentTime, maxTimeHighLight) &&
                    item.innerHTML === maxTimeSelected
                ) {
                    item.classList.add('react-datepicker__time-list-item--selected');
                }
            });
        }
    };

    return (
        <div className={`position-relative bases__width--${width} ${className}`}>
            <div className="components__timepicker">
                <DatePicker
                    ref={timeRef}
                    className={`components__timepicker-input w-100 bases__font--${fontSize} ${innerClassName}`}
                    placeholderText={placeHolder}
                    selected={value}
                    onBlur={(event) => handleOnBlur(event.currentTarget.value)}
                    onChange={(value: Date) => (onChange ? onChange(value) : {})}
                    onCalendarClose={() => (onBlur ? onBlur() : {})}
                    onCalendarOpen={() => {
                        handleSelectCurrentTime();
                    }}
                    showTimeSelect={true}
                    showTimeSelectOnly={true}
                    timeIntervals={timeIntervals}
                    timeFormat={timeFormat}
                    dateFormat={timeFormat}
                    minDate={minTime}
                    maxDate={maxTime}
                    filterTime={filterPassedTime}
                />
                <Img
                    className="components__timepicker-img bases__filter--dark-gray"
                    src={images.ICON_CLOCK}
                    onClick={() => timeRef.current?.setFocus()}
                />
            </div>
        </div>
    );
};

Timepicker.defaultProps = {
    className: '',
    fontSize: '14',
    timeFormat: 'HH:mm',
    width: '',
    timeIntervals: 1,
    placeHolder: 'hh:mm',
    innerClassName: '',
};

export default Timepicker;
