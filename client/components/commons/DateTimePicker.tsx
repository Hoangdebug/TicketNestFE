import Datepicker from '@components/commons/Datepicker';
import Timepicker from '@components/commons/Timepicker';

import { dateHelper, validateHelper } from '@utils/helpers';

const DateTimePicker: IDateTimePickerComponent<IDateTimePickerComponentProps> = (props) => {
    const { value, onChange, onBlur, minDate, maxDate, minTime, maxTime, className, classNameDate, classNameTime } = props;

    const handleChangeDateTime = (field: 'date' | 'time', newValue: Date) => {
        let date = value && validateHelper.isDate(value ?? '') ? dateHelper.formatDate(value ?? '', 'YYYY-MM-DD') : '';
        let time =
            !value || (value && validateHelper.isDateOnly(value ?? ''))
                ? ''
                : validateHelper.isDateTime(value ?? '')
                ? dateHelper.formatTime(value ?? '', 'HH:mm:ss')
                : dateHelper.formatFromTime(value ?? '', ' HH:mm:ss', 'HH:mm:ss');
        if (field === 'date') {
            date = newValue
                ? validateHelper.isDate(dateHelper.formatDate(newValue.toISOString(), 'YYYY-MM-DD'))
                    ? dateHelper.formatDate(newValue.toISOString(), 'YYYY-MM-DD')
                    : ''
                : '';
        }
        if (field === 'time') {
            time = newValue
                ? validateHelper.isTime(newValue ? dateHelper.formatDate(newValue.toISOString(), 'HH:mm:ss') : '')
                    ? dateHelper.formatDate(newValue.toISOString(), 'HH:mm:ss')
                    : ''
                : '';
        }

        if (onChange) {
            onChange(`${date ? date : ''}${time ? ` ${time}` : time}`);
        }
    };

    return (
        <div className={`d-flex justify-content-between ${className}`}>
            <Datepicker
                className={`bases__width-percent--60 ${classNameDate}`}
                value={value && validateHelper.isDate(value) ? dateHelper.formatToDate(value, 'YYYY-MM-DD HH:mm:ss') : null}
                onChange={(value: Date) => {
                    handleChangeDateTime('date', value);
                }}
                onBlur={() => (onBlur ? onBlur() : {})}
                minDate={minDate}
                maxDate={maxDate}
            />
            <Timepicker
                className={`bases__margin--left16 bases__width-percent--40 ${classNameTime}`}
                value={
                    !value || validateHelper.isDateOnly(value)
                        ? null
                        : validateHelper.isDateTime(value)
                        ? dateHelper.formatToDate(value, 'YYYY-MM-DD HH:mm:ss')
                        : dateHelper.formatToDate(value, 'HH:mm:ss')
                }
                onChange={(value: Date) => {
                    handleChangeDateTime('time', value);
                }}
                onBlur={() => (onBlur ? onBlur() : {})}
                minTime={minTime}
                maxTime={maxTime}
            />
        </div>
    );
};

DateTimePicker.defaultProps = {
    className: '',
    classNameDate: '',
    classNameTime: '',
};

export default DateTimePicker;
