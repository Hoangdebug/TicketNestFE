interface ISelectItem {
    value?: string;
    label?: string;
}

interface ISelectComponentProps extends IBaseCompProps {
    className?: string;
    options?: ISelectItem[];
    value?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
    isFilter?: boolean;
}
