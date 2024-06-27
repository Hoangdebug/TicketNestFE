interface IDateTimePickerComponentProps extends IBaseCompProps {
    value?: string;
    minDate?: Date | null;
    maxDate?: Date | null;
    minTime?: Date | null;
    maxTime?: Date | null;
    onChange?: (dateTime: string) => void;
    onBlur?: () => void;
    className?: string;
    classNameDate?: string;
    classNameTime?: string;
}

interface IDateTimePickerComponent<P = {}> extends IBaseComp<P> {}
