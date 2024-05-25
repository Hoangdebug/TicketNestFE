import moment from 'moment';

export const formatDate = (date: string, format: string) => {
    return moment.utc(date).local().format(format);
};
