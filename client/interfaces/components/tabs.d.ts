interface ITabsItem {
    event?: string;
    title?: ReactElement;
    content?: ReactElement;
}

interface ITabsComponentProps extends IBaseCompProps {
    table?: ITableComponentProps;
    tabs?: ITabsItem[];
    type?: 'boostrap' | 'material';
    defaultActiveKey?: string;
    onChangeEventKey?: (key: string) => void;
}

interface ITabsComponentState {
    eventKey?: string;
}

interface ITabsComponent<P = {}> extends IBaseComp<P> {}
