interface IChoiceItem {
    id?: string;
    label?: string;
    value?: string;
}

interface IChoiceComponentProps extends IBaseCompProps {
    data: IChoiceItem[];
    className?: string;
    onChange?: (value: string[]) => void;
    type?: 'radio' | 'checkbox';
    viewMode?: 'horizontal' | 'vertical';
    checked?: string[];
    id?: string;
}

interface IChoiceComponent<P = {}> extends IBaseComp<P> {}
