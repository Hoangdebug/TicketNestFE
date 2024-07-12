import { forwardRef } from 'react';
import ReactSelect, { createFilter, MultiValue } from 'react-select';

const Select = forwardRef<HTMLSelectElement, ISelectComponentProps>((props, ref) => {
    const { className, options, onBlur, onChange, value, isMulti, isBlankValue, disabled, hidenOption } = props;

    const handleMultiSelectValue = () => {
        return options?.filter((option) => (value?.indexOf(option.value ?? '') ?? -1) >= 0);
    };

    const handleChangeMultiSelect = (data: MultiValue<ISelectItem>) => {
        const selectedOptions = data.map((data) => data.value ?? '');
        if (onChange) {
            onChange(selectedOptions.join(','));
        }
    };

    if (isMulti) {
        return (
            <ReactSelect
                value={handleMultiSelectValue()}
                className={`bases__text--dark-gray bases__font--14 components__select-multi w-100 ${className}`}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => (onBlur ? onBlur(event.target.value) : {})}
                onChange={(data, _actionMeta) => handleChangeMultiSelect(data)}
                options={options}
                isMulti={isMulti}
                closeMenuOnSelect={false}
                blurInputOnSelect={false}
                filterOption={createFilter({ matchFrom: 'start' })}
                isSearchable={true}
                isClearable={false}
                placeholder=""
            />
        );
    }

    return (
        <select
            ref={ref}
            className={`bases__text--dark-gray bases__font--14 components__select ${className}`}
            onBlur={(event: React.ChangeEvent<HTMLSelectElement>) => (onBlur ? onBlur(event.currentTarget.value) : {})}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => (onChange ? onChange(event.currentTarget.value) : {})}
            value={value}
            disabled={disabled}
        >
            {options?.map((item, index) => {
                return (
                    <option
                        key={index}
                        disabled={(index === 0 && isBlankValue && !item.value) || item.disabled}
                        value={item.value}
                        hidden={hidenOption?.includes(item?.value?.toString() ?? '') ?? false}
                        selected={item.value === value}
                    >
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
});

Select.defaultProps = {
    className: '',
    isMulti: false,
    isBlankValue: false,
    disabled: false,
};

export default Select;
