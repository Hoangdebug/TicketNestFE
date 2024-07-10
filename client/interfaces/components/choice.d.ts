interface IChoiceItem {
    id?: string;
    value?: string;
    name?: string;
    text?: string;
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IChoiceComponentProps extends IBaseCompProps {
    items?: IChoiceItem[];
    type?: 'checkbox' | 'radio' | 'radio-number';
    className?: string;
    classNameWrapper?: string;
    classNameInput?: string;
    classNameLabel?: string;
    classNameLabelWrapper?: string;
    checked?: string[];
    disabled?: string[];
    fontSize?: string;
    text?: string;
    onChange?: (value: string[]) => void;
}

interface IChoiceComponentState {
    dataChecked?: string[];
}
