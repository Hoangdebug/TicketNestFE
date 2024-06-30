export const RULE = {
    EMAIL: /^(?![-_.+])([a-zA-Z0-9-_.+](?![-_.+]{2,}))+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,
    NUMBER: /^[0-9]*$/,
    DATE: /^\d{4}-\d{2}-\d{2}/,
    TIME: /\d{2}:\d{2}:\d{2}/,
    DATE_ONLY: /^\d{4}-\d{2}-\d{2}$/,
    TIME_ONLY: /^\d{2}:\d{2}:\d{2}$/,
    DATE_TIME: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
    SHORT_TIME: /^\d{2}:\d{2}$/,
    SIGNED_NUMBER: /^[0-9０-９-]*$/,
    FLOAT_NUMBER: /^([0-9０-９]+([.][0-9０-９]*)?|[.][0-9０-９]+)$/,
    SPECIAL_CHARACTER: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
};
