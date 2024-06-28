interface ITimepickerComponentProps extends IBaseCompProps {
    className?: string;
    fontSize?: string;
    timeFormat?: string;
    width?: string;
    timeIntervals?: number;
    placeHolder?: string;
    onChange?: (value: Date) => void;
    onBlur?: () => void;
    value?: Date | null;
    minTime?: Date | null;
    maxTime?: Date | null;
    dateIn?: Date | string;
    innerClassName?: string;
}

interface ITimepickerComponentState {
    time?: Date | null;
}

interface ITimepickerComponent<P = {}> extends IBaseComp<P> {}
