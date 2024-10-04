interface IBoxComponentProps extends IBaseCompProps {
    className?: string;
    background?: string;
    title?: string;
    classNameHeading?: string;
    classNameIcon?: string;
    srcImg?: string;
    fontSizeTitle?: string;
    colorTitle?: string;
    classNameTitle?: string;
    warningText?: string;
}

interface IBoxComponent<P = {}> extends IBaseComp<P> {}
