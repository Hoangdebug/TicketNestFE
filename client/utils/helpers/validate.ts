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

export const isDate = (value: string) => {
    if (regex.RULE.DATE.test(value)) {
        return true;
    }

    return false;
};

export const isTime = (value: string) => {
    if (regex.RULE.TIME.test(value)) {
        return true;
    }

    return false;
};

export const isDateOnly = (value: string) => {
    if (regex.RULE.DATE_ONLY.test(value)) {
        return true;
    }

    return false;
};

export const isTimeOnly = (value: string) => {
    if (regex.RULE.TIME_ONLY.test(value)) {
        return true;
    }

    return false;
};

export const isDateTime = (value: string) => {
    if (regex.RULE.DATE_TIME.test(value)) {
        return true;
    }

    return false;
};

export const isSignedNumber = (value: string) => {
    if (regex.RULE.SIGNED_NUMBER.test(value)) {
        return true;
    }

    return false;
};

export const isFloatNumber = (value: string) => {
    if (regex.RULE.FLOAT_NUMBER.test(value)) {
        return true;
    }

    return false;
};

export const isSpecialCharacter = (value: string) => {
    if (regex.RULE.SPECIAL_CHARACTER.test(value)) {
        return true;
    }

    return false;
};
