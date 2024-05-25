import { regex } from "../Common";

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
