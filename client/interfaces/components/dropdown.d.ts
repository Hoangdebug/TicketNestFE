interface IDropdownComponentProps extends IBaseCompProps {
    className?: string;
    toggle: JSX.Element;
    menu: JSX.Element;
    onToggle?: (isToggle: boolean) => void;
}

interface IDropdownComponent<P = {}> extends IBaseComp<P> {}

interface IDropdownComponentState {
    isShow?: boolean;
}

interface IDropdownComponentHandle {
    onShowToggle: () => void;
    onHideToggle: () => void;
}

interface IDropdownToggleComponentProps extends IBaseCompProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
