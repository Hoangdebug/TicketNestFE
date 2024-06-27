import { useState, useEffect, forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Img = forwardRef<HTMLImageElement, IImgComponentProps>((props, ref) => {
    const { isBlur, className, src, onClick, width, height } = props;
    const [classes, setClasses] = useState<string[]>([isBlur ? 'components__img-thumb' : '', className ?? '']);

    useEffect(() => {
        if (classes.length > 1) {
            classes[1] = className ?? '';
            setClasses([...classes]);
        }
    }, [className]);

    const handleImageLoaded = () => {
        if (isBlur) {
            classes[0] = 'components__img-full';
            setTimeout(() => {
                setClasses([...classes]);
            }, 500);
        }
    };

    const renderClass = () => {
        let classNameImg = '';
        for (const [_index, item] of classes.entries()) {
            if (item) {
                classNameImg += `${item} `;
            }
        }
        return classNameImg;
    };

    return (
        <>
            <LazyLoadImage
                className={renderClass()}
                onClick={() => (onClick ? onClick() : {})}
                onLoad={() => handleImageLoaded()}
                src={src}
                width={width}
                height={height}
                draggable={false}
            />
            <noscript>
                <img ref={ref} className={className} src={src} draggable={false} alt="AIMS" />
            </noscript>
        </>
    );
});

Img.defaultProps = {
    className: '',
    isBlur: false,
    placeholder: '',
    src: '',
    onClick: () => {},
};

export default Img;
