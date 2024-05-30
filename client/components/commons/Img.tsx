import { useState, forwardRef } from 'react';
import LazyImg from 'react-cool-img';

const Img = forwardRef<HTMLImageElement, IImgComponentProps>((props, ref) => {
    const { isBlur, placeholder, className, src, onClick, width, height } = props;
    const [classes, setClasses] = useState<string[]>([isBlur ? 'components__img-thumb' : '', className ?? '']);

    const handleImageLoaded = () => {
        if (isBlur) {
            classes[0] = 'components__img-full';
            setTimeout(() => {
                setClasses([...classes]);
            }, 500);
        }
    };

    const renderClass = () => {
        let className = '';
        for (const [index, item] of classes.entries()) {
            className += item;
            if (item && index < classes.length - 1) {
                className += ' ';
            }
        }
        return className;
    };

    return (
        <>
            <LazyImg
                ref={ref}
                className={renderClass()}
                placeholder={placeholder ? placeholder : src}
                onClick={() => (onClick ? onClick() : {})}
                onLoad={() => handleImageLoaded()}
                debounce={0}
                src={src}
                width={width}
                height={height}
                draggable={false}
            />
            <noscript>
                <img className={className} src={src} alt="Training" />
            </noscript>
        </>
    );
});

Img.defaultProps = {
    isBlur: false,
    placeholder: '',
    className: '',
    src: '',
    onClick: () => {},
};

export default Img;
