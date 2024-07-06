interface IModalComponentProps extends IBaseCompProps {
    background?: string;
    textColor?: string;
    borderColor?: string;
    fontSize?: string;
}

interface IModalComponent<P = {}> extends IBaseComp<P> {}
