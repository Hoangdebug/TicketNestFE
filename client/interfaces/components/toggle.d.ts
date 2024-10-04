interface IToggleOptionItem {
    href?: string;
    title?: string;
    childHrefs?: string[];
}

interface IToggleItem {
    href?: string;
    title?: string;
    options?: IToggleOptionItem[];
    icon?: string;
}

interface IToggleComponentProps extends IBaseCompProps {
    data?: IToggleItem[];
    viewMode?: 'admin' | 'user';
}

interface IToggleComponent<P = {}> extends IBaseComp<P> {}

interface IToggleComponentState {
    activeClass: string;
    highlightClass: string;
    isFirstTime: boolean;
    activeLink: string;
}
