import { regex } from '@utils/constants';
import moment from 'moment';

export const formatDate = (date: string, format: string) => {
    return moment.utc(date).local().format(format);
};

export const formatTime = (time: string, toFormat: string = 'HH:mm') => {
    if (time) {
        return moment(time).format(toFormat);
    }
    return '';
};

export const formatFromTime = (time: string, fromFormat: string = 'HH:mm', toFormat: string = 'HH:mm') => {
    if (time) {
        return moment(time, fromFormat).format(toFormat);
    }

    return '';
};

export const formatToDate = (date: string, fromFormat: string = 'YYYY/MM/DD') => {
    if (date) {
        return moment(date, fromFormat).toDate();
    }

    return null;
};

export const compareDateSameOrBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSameOrBefore(moment(to_date, fromFormat));
};

export const getUTCStringNow = () => {
    return moment().toDate().toISOString();
};

export const compareDateSameOrAfter = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSameOrAfter(moment(to_date, fromFormat));
};

export const formatFromText = (date: string) => {
    return moment(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`).toDate();
};

export const calculateAge = (date: string) => {
    let age: number = 0;
    if (date) {
        const today = getDate();
        const birthDate = formatToDate(date, 'YYYY-MM-DD');

        if (birthDate) {
            age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        }
    }

    return age;
};

export const isValidDate = (date: Date) => {
    if (date) {
        return moment(date).isValid();
    }

    return false;
};

export const getDate = () => {
    return moment().toDate();
};

export const isValid = (date: string, fromFormat: string = 'YYYY/MM/DD') => {
    if (date) {
        return moment(date, fromFormat).isValid();
    }

    return false;
};

export const formatTimeFromText = (current: Date, time: string, type: 'number' | 'free' = 'number') => {
    const date = formatDate(current.toISOString(), 'YYYY-MM-DD');
    let dateTime;
    if (type === 'number') {
        dateTime = moment(`${date} ${time.substring(0, 2)}:${time.substring(2, 4)}:00`);
    } else {
        if (regex.RULE.SHORT_TIME.test(time)) {
            dateTime = moment(`${date} ${time}:00`);
        }
    }
    if (dateTime && dateTime.isValid()) {
        return dateTime.toDate();
    }
    return undefined;
};

export const compareDateBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isBefore(moment(to_date, fromFormat));
};

export const compareDateSame = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from_date, fromFormat).isSame(moment(to_date, fromFormat));
};
