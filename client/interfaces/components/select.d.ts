interface ISelectItem {
    value?: string;
    label?: string;
    disabled?: boolean;
    classOption?: string;
}

interface ISelectComponentProps extends IBaseCompProps {
    className?: string;
    options?: ISelectItem[];
    value?: string | string[];
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
    isMulti?: boolean;
    isFilter?: boolean;
    isBlankValue?: boolean;
    disabled?: boolean;
    hidenOption?: string[];
}
