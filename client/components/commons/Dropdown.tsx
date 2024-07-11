import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dropdown as DropdownBootstrap } from 'react-bootstrap';

const DropdownToggle = forwardRef<HTMLDivElement, IDropdownToggleComponentProps>((props, ref) => {
    const { children, onClick } = props;

    return (
        <div role="button" ref={ref} onClick={(event: React.MouseEvent<HTMLDivElement>) => (onClick ? onClick(event) : {})}>
            {children}
        </div>
    );
});

const Dropdown = forwardRef<IDropdownComponentHandle, IDropdownComponentProps>((props, ref) => {
    const { className, toggle, menu, onToggle } = props;
    const [state, setState] = useState<IDropdownComponentState>({
        isShow: false,
    });
    const { isShow } = state;

    useImperativeHandle(ref, () => ({
        onShowToggle: () => {
            setState((prevState) => ({
                ...prevState,
                isShow: true,
            }));
        },
        onHideToggle: () => {
            setState((prevState) => ({
                ...prevState,
                isShow: false,
            }));
        },
    }));

    const handleToggleDropDown = () => {
        if (onToggle) {
            onToggle(!isShow);
        }
        setState((prevState) => ({
            ...prevState,
            isShow: !isShow,
        }));
    };

    return (
        <div className={`components__dropdown ${className}`}>
            <DropdownBootstrap show={isShow} onToggle={() => handleToggleDropDown()}>
                <DropdownBootstrap.Toggle as={DropdownToggle}>{toggle}</DropdownBootstrap.Toggle>
                <DropdownBootstrap.Menu>{menu}</DropdownBootstrap.Menu>
            </DropdownBootstrap>
        </div>
    );
});

Dropdown.defaultProps = {
    className: '',
};

export default Dropdown;
