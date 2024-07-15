import { createRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

import Img from '@components/commons/Img';

import { images } from '@utils/constants';
import { dateHelper, stringHelper, validateHelper } from '@utils/helpers';

const Datepicker: IDatepickerComponent<IDatepickerComponentProps> = (props) => {
    const {
        className,
        fontSize,
        dateFormat,
        timeFormat,
        width,
        showTimeInput,
        location,
        height,
        placeholder,
        dateTimeFormat,
        onChange,
        value,
        minDate,
        maxDate,
        onBlur,
        innerClassName,
    } = props;

    const dateRef = createRef<ReactDatePicker>();
    const timeProps = {
        dateFormat: dateTimeFormat,
        timeFormat,
        showTimeInput: true,
        placeholderText: '',
    };

    const checkDate = (date: Date) => {
        return (
            (maxDate &&
                !minDate &&
                dateHelper.compareDateSameOrBefore(
                    dateHelper.formatDate(date?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                    dateHelper.formatDate(maxDate?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                )) ||
            (minDate &&
                !maxDate &&
                dateHelper.compareDateSameOrAfter(
                    dateHelper.formatDate(date?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                    dateHelper.formatDate(minDate?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                )) ||
            (minDate &&
                maxDate &&
                dateHelper.compareDateSameOrAfter(
                    dateHelper.formatDate(date?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                    dateHelper.formatDate(minDate?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                ) &&
                dateHelper.compareDateSameOrBefore(
                    dateHelper.formatDate(date?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                    dateHelper.formatDate(maxDate?.toISOString() ?? dateHelper.getUTCStringNow(), 'YYYY-MM-DD'),
                ))
        );
    };

    const handleInputDate = (val: string) => {
        const value = stringHelper.formatHalfWidthText(val);
        if (onChange) {
            if (value && validateHelper.isNumber(value)) {
                if (value.length > 8) {
                    onChange(dateHelper.getDate());
                } else {
                    if (value.length === 8) {
                        const date = dateHelper.formatFromText(value);
                        if (dateHelper.isValidDate(date)) {
                            if (checkDate(date)) {
                                onChange(date);
                            } else {
                                onChange(dateHelper.getDate());
                            }
                        } else {
                            onChange(dateHelper.getDate());
                        }
                    } else {
                        onChange(dateHelper.getDate());
                    }
                }
            } else {
                if (!dateHelper.isValid(value) && value !== '') {
                    onChange(dateHelper.getDate());
                } else if (dateHelper.isValid(value)) {
                    const date = dateHelper.formatToDate(value, 'YYYY-MM-DD HH:mm:ss');
                    if (date && checkDate(date)) {
                        onChange(date);
                    } else {
                        onChange(dateHelper.getDate());
                    }
                }
            }
        }
    };

    return (
        <div
            className={`components__datepicker ${
                showTimeInput ? '' : 'position-relative'
            } bases__width${width} bases__height${height} ${className}`}
        >
            <DatePicker
                ref={dateRef}
                className={`w-100 components__datepicker-input bases__font--${fontSize} ${innerClassName}`}
                selected={value}
                onBlur={(event) => handleInputDate(event.currentTarget.value)}
                onChange={(value: Date) => (onChange ? onChange(value) : {})}
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
                dropdownMode="select"
                locale={location}
                minDate={minDate}
                maxDate={maxDate}
                onCalendarClose={() => (onBlur ? onBlur() : {})}
                {...(showTimeInput
                    ? timeProps
                    : {
                          dateFormat,
                          placeholderText: placeholder,
                      })}
            />
            {showTimeInput ? (
                <></>
            ) : (
                <Img
                    className="components__datepicker-img bases__filter--dark-gray position-absolute"
                    src={images.ICON_CALENDAR}
                    onClick={() => dateRef.current?.setFocus()}
                />
            )}
        </div>
    );
};

Datepicker.defaultProps = {
    className: '',
    fontSize: '14',
    dateFormat: 'yyyy/MM/dd',
    width: '',
    height: '',
    showTimeInput: false,
    location: 'ja',
    placeholder: 'yyyy/mm/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm',
    minDate: null,
    maxDate: dateHelper.getDate(),
    value: null,
    innerClassName: '',
};

export default Datepicker;
