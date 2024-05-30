import { regex } from '@utils/constants';

export const isEmpty = (value: string) => {
    if (!value) {
        return true;
    }

    return false;
};

export const isEmail = (value: string) => {
    if (regex.RULE.EMAIL.test(value)) {
        return true;
    }

    return false;
};

export const isNumber = (value: string) => {
    if (regex.RULE.NUMBER.test(value)) {
        return true;
    }

    return false;
};
export const isCharacters = (value: string) => {
    if (value.length < 2) {
        return true;
    }

    return false;
};
