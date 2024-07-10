interface ITableHeadItem {
    className?: string;
    title?: string;
    isSort?: boolean;
    isCheckbox?: boolean;
    dataCheckbox?: IChoiceComponentProps[];
    subHead?: ITableHeadItem[];
    onClick?: () => void;
}

interface ITableBodyColumnItem {
    field?: string;
    isInput?: boolean;
    isCheckbox?: boolean;
    isRadio?: boolean;
    isLink?: boolean;
    isSelect?: boolean;
    isButton?: boolean;
    isDatepicker?: boolean;
    isDropdown?: boolean;
    className?: string;
}

interface ITableBodyItem {
    columns?: ITableBodyColumnItem[];
    rows?: any[];
}

interface ITableCheckboxItem {
    type?: string;
    checked?: string[];
    items?: {
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }[];
}

interface IDropdownItems {
    id?: number;
    value?: string;
    text?: string;
    disabled?: boolean;
}

interface ITableComponentProps extends IBaseCompProps {
    className?: string;
    classNameTable?: string;
    classNameTr?: string;
    classNameTh?: string;
    classNameThIcon?: string;
    classNameTd?: string;
    heads?: ITableHeadItem[];
    body?: ITableBodyItem;
    btn?: JSX.Element;
    total?: number;
    onChangeCheckList?: (value: string[]) => void;
    isStickyColumn?: boolean;
    classNameWrapper?: string;
    page?: number;
    limit?: number;
    onChangePage?: (value: number) => void;
}

interface ITableComponentState {
    checkedValue?: string[];
    isScrollLeftEnd?: boolean;
    subHead?: ITableSubHeadItem[];
}

interface ITableComponentHandle {
    onClearCheckedList: () => void;
}

interface ITableComponent<P = {}> extends IBaseComp<P> {}
