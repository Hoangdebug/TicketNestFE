interface IBaseCompProps {
    children?: React.ReactNode;
}

interface IBaseComp<P> extends React.FC<P> {
    defaultProps?: Partial<P>;
}

interface IBaseCompState {
    disabled?: boolean;
}
