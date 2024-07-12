import { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import Input from '@components/commons/Input';
import Choice from '@components/commons/Choice';
import Button from '@components/commons/Button';
import Select from '@components/commons/Select';
import Datepicker from '@components/commons/Datepicker';
import Img from '@components/commons/Img';
import Dropdown from '@components/commons/Dropdown';

import { useTrans } from '@utils/hooks';
import { images } from '@utils/constants';

import Pagination from '@components/layouts/Pagination';

const Table = forwardRef<ITableComponentHandle, ITableComponentProps>((props, ref) => {
    const trans = useTrans();
    const {
        className,
        classNameTable,
        classNameTr,
        classNameTh,
        classNameThIcon,
        classNameTd,
        heads,
        body,
        btn,
        total,
        onChangeCheckList,
        isStickyColumn,
        classNameWrapper,
        page,
        limit,
        onChangePage,
    } = props;
    const [state, setState] = useState<ITableComponentState>({
        checkedValue: [],
        isScrollLeftEnd: true,
        subHead: [],
    });
    const { checkedValue, isScrollLeftEnd, subHead } = state;
    const tableWrapperRef = createRef<HTMLDivElement>();

    useImperativeHandle(ref, () => ({
        onClearCheckedList: () => {
            if (onChangeCheckList) {
                onChangeCheckList([]);
            }
            setState((prevState) => ({
                ...prevState,
                checkedValue: [],
            }));
        },
    }));

    useEffect(() => {
        let subHead: ITableHeadItem[] = [];
        heads?.map((head) => {
            if (head.subHead && head.subHead.length > 0) {
                subHead = [...subHead, ...(head.subHead ?? [])];
            }
        });
        setState((prevState) => ({
            ...prevState,
            subHead,
        }));
    }, []);

    const handleCheckList = (checked: string[], isHead: boolean = false) => {
        const newCheckedValue: string[] = checkedValue ?? [];

        if (isHead) {
            if (checked.includes('all')) {
                if (!newCheckedValue?.includes('all')) {
                    newCheckedValue?.push('all');
                }
                body?.rows?.forEach((itemRow) => {
                    const itemColumn = body?.columns?.find((itemColumn) => itemColumn.isCheckbox);
                    const item = itemRow[itemColumn?.field ?? ''][0].items[0];

                    if (!itemRow[itemColumn?.field ?? ''][0].disabled) {
                        if (!newCheckedValue.includes(item?.value ?? '')) {
                            newCheckedValue?.push(item?.value ?? '');
                        }
                    }
                });
            } else {
                newCheckedValue.length = 0;
            }
        } else {
            const checkedValue = checked[0] ?? '';
            if (checkedValue !== '' && !newCheckedValue.includes(checkedValue)) {
                newCheckedValue?.push(checkedValue);
            }

            const currentCheckedList: string[] = [];
            body?.rows?.forEach((itemRow) => {
                const itemColumn = body?.columns?.find((itemColumn) => itemColumn.isCheckbox);
                const item = itemRow[itemColumn?.field ?? ''][0].items[0];
                if (newCheckedValue.includes(item.value)) {
                    currentCheckedList.push(item.value);
                }
            });

            const allCheckIndex = checked.indexOf('all');
            if (currentCheckedList.length === (body?.rows?.length ?? 0)) {
                if (allCheckIndex < 0) {
                    newCheckedValue?.push('all');
                }
            } else {
                if (allCheckIndex >= 0) {
                    newCheckedValue?.splice(allCheckIndex, 1);
                }
            }
        }

        if (onChangeCheckList) {
            onChangeCheckList(newCheckedValue.filter((value) => value !== 'all'));
        }

        setState((prevState) => ({
            ...prevState,
            checkedValue: newCheckedValue,
        }));
    };

    const handleScrollHorizontal = () => {
        if (isStickyColumn) {
            setState((prevState) => ({
                ...prevState,
                isScrollLeftEnd: tableWrapperRef.current?.scrollLeft === 0,
            }));
        }
    };

    const handleChangePage = (page: number) => {
        if (onChangePage) {
            window.scrollTo({
                top: (tableWrapperRef.current?.offsetTop ?? 0) - 150,
                behavior: 'auto',
            });
            onChangePage(page);
        }
    };

    const renderCheckedAll = () => {
        let countCheckedItem = 0;
        body?.rows?.forEach((itemRow) => {
            const itemColumn = body?.columns?.find((itemColumn) => itemColumn.isCheckbox);
            if (itemColumn) {
                const item = itemRow[itemColumn?.field ?? ''][0].items[0];
                if (checkedValue?.includes(item.value ?? '')) {
                    countCheckedItem++;
                }
            }
        });

        if ((body?.rows?.length ?? 0) > 0 && countCheckedItem === (body?.rows?.length ?? 0)) {
            return ['all'];
        }

        return [];
    };

    const renderHeads = (isSub: boolean = false) => {
        const headData = isSub ? subHead : heads;
        return (
            <tr className={classNameTr}>
                {headData?.map((head, index) => {
                    if (Object.keys(head).length === 0) {
                        return;
                    }

                    return (
                        <th
                            rowSpan={!isSub && !head.subHead && subHead?.length ? 2 : undefined}
                            colSpan={!isSub && head.subHead ? head.subHead?.length : undefined}
                            key={index}
                            className={`bases__text--bold bases__font--14 ${classNameTh} ${head?.className ?? ''} ${
                                head.isSort ? 'bases__p--cursor' : ''
                            }`}
                            onClick={() => head && head.onClick && head.onClick()}
                        >
                            {head.isCheckbox ? (
                                <Choice
                                    type="checkbox"
                                    classNameLabelWrapper="justify-content-center"
                                    checked={renderCheckedAll()}
                                    items={(head?.dataCheckbox ?? [])[0]?.items}
                                    className="text-center"
                                    onChange={(value: string[]) => handleCheckList(value, true)}
                                />
                            ) : (
                                <>
                                    <span className={head.isSort ? 'components__table-sorted' : ''}>{head?.title}</span>
                                    <Img
                                        src={images.ICON_SORT}
                                        className={`${head.isSort ? 'components__table-sorted-icon' : 'd-none'} ${classNameThIcon}`}
                                    />
                                </>
                            )}
                        </th>
                    );
                })}
            </tr>
        );
    };

    const renderRowValue = (itemColumn: ITableBodyColumnItem, itemRow: any) => {
        let rowValue = null;
        const fields = itemColumn?.field?.split('.') ?? [];

        for (const field of fields) {
            rowValue = !rowValue ? itemRow[field ?? ''] : rowValue[field];
        }

        return rowValue;
    };

    const renderRows = () => {
        return (
            <>
                {body?.rows?.map((itemRow, indexRow) => (
                    <tr key={indexRow} className={classNameTr}>
                        {body?.columns?.map((itemColumn, indexColumn) => {
                            if (Object.keys(itemColumn).length === 0) {
                                return;
                            }

                            return (
                                <td
                                    key={indexColumn}
                                    className={`bases__font--14 ${classNameTd} ${itemColumn.isButton ? 'components__table-btn_body' : ''} ${
                                        itemColumn?.className ?? ''
                                    }`}
                                >
                                    {itemColumn.isInput ? (
                                        itemRow[itemColumn?.field ?? ''] && (
                                            <Input
                                                value={itemRow[itemColumn?.field ?? ''][0].value}
                                                rawValue={itemRow[itemColumn?.field ?? ''][0].rawValue}
                                                name={itemRow[itemColumn?.field ?? ''][0].name}
                                                id={itemRow[itemColumn?.field ?? ''][0].id}
                                                disabled={itemRow[itemColumn?.field ?? ''][0].disabled}
                                                type={itemRow[itemColumn?.field ?? ''][0].type}
                                                className={itemRow[itemColumn?.field ?? ''][0].className}
                                                onChange={itemRow[itemColumn?.field ?? ''][0].onChange}
                                                onBlur={itemRow[itemColumn?.field ?? ''][0].onBlur}
                                                onPress={itemRow[itemColumn?.field ?? ''][0].onPress}
                                                fontSize={itemRow[itemColumn?.field ?? ''][0].fontSize}
                                                placeholder={itemRow[itemColumn?.field ?? ''][0].placeholder}
                                                readOnly={itemRow[itemColumn?.field ?? ''][0].readOnly}
                                                maxLength={itemRow[itemColumn?.field ?? ''][0].maxLength}
                                            />
                                        )
                                    ) : itemColumn.isCheckbox ? (
                                        itemRow[itemColumn?.field ?? ''] && (
                                            <Choice
                                                type="checkbox"
                                                classNameLabelWrapper="justify-content-center"
                                                checked={itemRow[itemColumn?.field ?? ''][0].checked ?? checkedValue}
                                                items={itemRow[itemColumn?.field ?? ''][0].items}
                                                disabled={itemRow[itemColumn?.field ?? ''][0].disabled}
                                                className="text-center"
                                                onChange={(value: string[]) => handleCheckList(value)}
                                            />
                                        )
                                    ) : itemColumn.isRadio ? (
                                        itemRow[itemColumn?.field ?? ''] && (
                                            <Choice
                                                type="radio"
                                                checked={itemRow[itemColumn?.field ?? ''][0].checked}
                                                items={itemRow[itemColumn?.field ?? ''][0].items}
                                                className="text-center"
                                            />
                                        )
                                    ) : itemColumn.isSelect ? (
                                        itemRow[itemColumn?.field ?? ''] &&
                                        Object.keys(itemRow[itemColumn?.field ?? '']).length > 0 && (
                                            <Select
                                                className={`${itemRow[itemColumn?.field ?? '']['className']} bases__padding--left10`}
                                                options={itemRow[itemColumn?.field ?? '']['list']}
                                                value={itemRow[itemColumn?.field ?? '']['selected']}
                                                onChange={itemRow[itemColumn?.field ?? '']['onChange']}
                                                hidenOption={itemRow[itemColumn?.field ?? '']['hidenOption']}
                                            />
                                        )
                                    ) : itemColumn.isButton ? (
                                        <Button
                                            startIcon={itemRow[itemColumn?.field ?? '']['srcIcon']}
                                            className="components__table-btn_detail"
                                            background={itemRow[itemColumn?.field ?? '']['background'] ?? 'green'}
                                            width="42"
                                            height="28"
                                            onClick={itemRow[itemColumn?.field ?? '']['onClick'] ?? {}}
                                        />
                                    ) : itemColumn.isDropdown ? (
                                        itemRow[itemColumn?.field ?? ''] &&
                                        Object.keys(itemRow[itemColumn?.field ?? '']).length > 0 && (
                                            <Dropdown
                                                toggle={
                                                    <div className="bases__background--dark-gray bases__border--radius5">
                                                        <Img src={images.ICON_DROPDOWN} className="bases__filter--white" />
                                                    </div>
                                                }
                                                menu={
                                                    <div className="components__table-dropdown">
                                                        {itemRow[itemColumn?.field ?? '']['dropdownItems']?.map(
                                                            (item: IDropdownItems, index: number) => {
                                                                return (
                                                                    <div
                                                                        className={`components__table-dropdown_items${
                                                                            item.disabled ? '-disabled' : ''
                                                                        }`}
                                                                        key={index}
                                                                    >
                                                                        <Button
                                                                            buttonText={item.text ?? ''}
                                                                            disabled={item.disabled}
                                                                            background="transparent"
                                                                            textColor="black"
                                                                            className="components__table-dropdown_button"
                                                                            height="30"
                                                                            onClick={() =>
                                                                                itemRow[itemColumn?.field ?? '']['onClick'](item.value) ??
                                                                                {}
                                                                            }
                                                                        />
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                }
                                            />
                                        )
                                    ) : itemColumn.isDatepicker ? (
                                        <Datepicker
                                            value={itemRow[itemColumn?.field ?? ''][0].value}
                                            showTimeInput={true}
                                            width={itemRow[itemColumn?.field ?? ''][0].width ?? 163}
                                            height={itemRow[itemColumn?.field ?? ''][0].height ?? 32}
                                            onChange={itemRow[itemColumn?.field ?? ''][0].onChange}
                                        />
                                    ) : (
                                        <span className={itemColumn?.isLink ? 'components__table-link' : ''}>
                                            {renderRowValue(itemColumn, itemRow)}
                                        </span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </>
        );
    };

    const renderTopTable = (button?: JSX.Element) => {
        return (
            <>
                <span className="bases__font--14">
                    {total ?? 0}
                    The item was found to be relevant.
                </span>
                {button}
            </>
        );
    };

    return (
        <div className={`components__table ${className}`}>
            {btn && <div className="d-flex align-items-center bases__margin--bottom12">{renderTopTable(btn)}</div>}
            <div
                ref={tableWrapperRef}
                className={`components__table-wrapper bases__padding--bottom20 ${classNameWrapper}`}
                onScroll={() => handleScrollHorizontal()}
            >
                <table
                    className={`components__table-border ${isStickyColumn ? 'components__table-sticky' : ''} ${
                        isStickyColumn && !isScrollLeftEnd ? 'components__table-sticky-border' : ''
                    } ${classNameTable}`}
                >
                    <thead>
                        {renderHeads()}
                        {renderHeads(true)}
                    </thead>
                    <tbody>{renderRows()}</tbody>
                </table>
            </div>
            {total && page ? (
                <Pagination current={page} totalPage={Math.ceil(total / (limit ?? 10))} onPageChange={(page) => handleChangePage(page)} />
            ) : (
                <></>
            )}
        </div>
    );
});

Table.defaultProps = {
    className: '',
    classNameTable: 'w-100',
    classNameTr: '',
    classNameTh: '',
    classNameThIcon: '',
    classNameTd: '',
    isStickyColumn: false,
    limit: 100,
};

export default Table;
