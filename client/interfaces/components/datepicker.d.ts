interface IDatepickerComponentProps extends IBaseCompProps {
    textColor?: string;
    className?: string;
    innerClassName?: string;
    fontSize?: string;
    placeholder?: string;
    dateFormat?: string;
    onClick?: () => void;
    setStartDate?: () => void;
    setOpenDatePicker?: () => void;
    onChange?: (date: Date) => void;
    onBlur?: () => void;
    width?: string;
    height?: string;
    timeFormat?: string;
    selected?: Date | null;
    showTimeInput?: boolean;
    location?: string;
    date?: Date | null;
    time?: Date;
    dateTimeFormat?: string;
    value?: Date | null;
    minDate?: Date | null;
    maxDate?: Date | null;
}

interface IDatepickerComponentState {
    date?: Date | null;
}

interface IDatepickerComponent<P = {}> extends IBaseComp<P> {}
