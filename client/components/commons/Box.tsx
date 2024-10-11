import Img from '@components/commons/Img';

const Box: IBoxComponent<IBoxComponentProps> = (props) => {
    const {
        children,
        className,
        background,
        title,
        classNameHeading,
        classNameIcon,
        srcImg,
        fontSizeTitle,
        colorTitle,
        classNameTitle,
        warningText,
    } = props;

    return (
        <>
            {warningText && (
                <div className="components__box-warning bases__background--red-opacity bases__height--50 d-flex align-items-center justify-content-center">
                    <span className="bases__text--red bases__font--16 bases__text-bold">{warningText}</span>
                </div>
            )}
            <div
                className={`components__box bases__background--${background} ${
                    warningText ? 'components__box--no_top_radius' : ''
                } ${className}`}
            >
                {title ? (
                    <div className={`components__box-title ${classNameHeading}`}>
                        {srcImg ? <Img className={`bases__filter--${colorTitle} ${classNameIcon}`} src={srcImg} /> : <></>}

                        <span className={`bases__font--${fontSizeTitle} bases__text--${colorTitle} ${classNameTitle}`}>{title}</span>
                    </div>
                ) : (
                    <></>
                )}
                {children}
            </div>
        </>
    );
};

Box.defaultProps = {
    className: '',
    classNameHeading: '',
    classNameIcon: '',
    background: 'white',
    fontSizeTitle: '18',
    colorTitle: 'dark-gray',
    classNameTitle: 'bases__text--bold',
    warningText: '',
};

export default Box;
