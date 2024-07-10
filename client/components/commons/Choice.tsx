import { forwardRef } from 'react';

const Choice = forwardRef<HTMLInputElement, IChoiceComponentProps>((props, ref) => {
    const {
        items,
        type,
        className,
        classNameWrapper,
        classNameInput,
        classNameLabel,
        classNameLabelWrapper,
        checked,
        disabled,
        fontSize,
        onChange,
    } = props;

    const handleOnChange = (item: IChoiceItem, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        let checkedValue = checked ?? [];
        if (type === 'checkbox') {
            const checkedIndex = checked?.indexOf(value) ?? -1;
            if (checkedIndex >= 0) {
                checkedValue?.splice(checkedIndex, 1);
            } else {
                checkedValue?.push(value);
            }
        } else {
            checkedValue = [value];
        }

        if (onChange) {
            onChange(checkedValue ?? []);
        }
        if (item.onChange) {
            item.onChange(event);
        }
    };

    return (
        <div className={`components__choice ${className}`}>
            {items?.length ? (
                items?.map((item, index) => {
                    return (
                        <span
                            key={index}
                            className={`${item.text ? 'components__choice-wrap d-inline-flex align-items-center' : ''} ${classNameWrapper}`}
                        >
                            <label className={`m-0 p-0 d-flex align-items-center ${classNameLabelWrapper}`}>
                                <input
                                    ref={ref}
                                    id={item.id}
                                    type={type === 'checkbox' ? 'checkbox' : 'radio'}
                                    value={item.value}
                                    name={item.name}
                                    disabled={disabled?.includes(item?.value?.toString() ?? '') ?? false}
                                    checked={checked?.includes(item?.value?.toString() ?? '') ?? false}
                                    className={`components__choice--${type === 'checkbox' ? 'checkbox' : 'radio'} ${classNameInput} ${
                                        type === 'radio-number' ? 'd-none' : ''
                                    }`}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(item, event)}
                                />
                                {type === 'radio-number' && (
                                    <div className={`components__choice-wrap--number ${item.text ? '' : 'me-0'}`}>{index + 1}</div>
                                )}
                            </label>
                            {item.text ? (
                                <label htmlFor={item.id} className={`bases__font--${fontSize} ${classNameLabel}`}>
                                    {item.text}
                                </label>
                            ) : (
                                <></>
                            )}
                        </span>
                    );
                })
            ) : (
                <span>
                    <input ref={ref} type={type === 'checkbox' ? 'checkbox' : 'radio'} className={`components__choice--${type}`} />
                </span>
            )}
        </div>
    );
});

Choice.defaultProps = {
    fontSize: '14',
    className: '',
    classNameLabel: '',
    classNameInput: '',
    classNameWrapper: '',
    classNameLabelWrapper: '',
};

export default Choice;
