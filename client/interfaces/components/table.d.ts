interface ITableHeadItem {
    className?: string;
    title?: string;
    isSort?: boolean;
    isCheckbox?: boolean;
    dataCheckbox?: IChoiceComponentProps[];
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
    className?: string;
}

interface ITableBodyItem {
    columns?: ITableBodyColumnItem[];
    rows?: any[];
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
    isStickyColumn?: boolean;
    onChangeCheckList?: (value: string[]) => void;
    onChangePage?: (page: number) => void;
}

interface ITableComponentState {
    checkedValue?: string[];
    isScrollLeftEnd?: boolean;
    page?: number;
}

interface ITableComponentHandle {
    onClearCheckedList: () => void;
}

interface ITableComponent<P = {}> extends IBaseComp<P> {}
