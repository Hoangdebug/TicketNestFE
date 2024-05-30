import { createRef, forwardRef, useImperativeHandle, useState } from 'react';

import Input from '@components/commons/Input';
import Choice from '@components/commons/Choice';
import Button from '@components/commons/Button';
import Select from '@components/commons/Select';
import Img from '@components/commons/Img';
import Pagination from '@components/layouts/Pagination';

import { useTrans } from '@utils/hooks';
import { images } from '@utils/constants';

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
        isStickyColumn,
        onChangeCheckList,
        onChangePage,
    } = props;
    const [state, setState] = useState<ITableComponentState>({
        checkedValue: [],
        isScrollLeftEnd: true,
        page: 1,
    });
    const { checkedValue, isScrollLeftEnd, page } = state;
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

    const handleCheckList = (checked: string[], isHead: boolean = false) => {
        const checkedValue: string[] = [];
        const checkedList: string[] = [];

        if (isHead) {
            checked.forEach((value) => {
                if (value === 'all') {
                    checkedValue.push('all');
                    body?.rows?.forEach((itemRow) => {
                        body?.columns?.forEach((itemColumn) => {
                            if (itemColumn.isCheckbox) {
                                const item = itemRow[itemColumn?.field ?? ''][0].data[0];
                                checkedValue.push(item?.value ?? '');
                                checkedList.push(item?.value ?? '');
                            }
                        });
                    });
                } else {
                    checkedValue.length = 0;
                }
            });
        } else {
            checked.forEach((value) => {
                checkedValue?.push(value);
                if (value !== 'all') {
                    checkedList.push(value);
                }
            });

            const allCheckIndex = checked.indexOf('all');
            if (checkedList.length === (body?.rows?.length ?? 0)) {
                if (allCheckIndex < 0) {
                    checkedValue?.push('all');
                }
            } else {
                if (allCheckIndex >= 0) {
                    checkedValue?.splice(allCheckIndex, 1);
                }
            }
        }

        if (onChangeCheckList) {
            onChangeCheckList(checkedList);
        }

        setState((prevState) => ({
            ...prevState,
            checkedValue,
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

    const handleChanePage = (page: number) => {
        setState((prevState) => ({
            ...prevState,
            page,
        }));
        if (onChangePage) {
            onChangePage(page);
        }
    };

    const renderHeads = () => {
        return (
            <tr className={classNameTr}>
                {heads?.map((head, index) => {
                    if (Object.keys(head).length === 0) {
                        return;
                    }

                    return (
                        <th
                            key={index}
                            className={`bases__text--bold bases__font--14 ${classNameTh} ${head?.className ?? ''} ${
                                head.isSort ? 'bases__p--cursor' : ''
                            }`}
                            onClick={() => head && head.onClick && head.onClick()}
                        >
                            {head.isCheckbox ? (
                                <Choice
                                    type="checkbox"
                                    checked={checkedValue ?? []}
                                    data={(head?.dataCheckbox ?? [])[0]?.data}
                                    className="justify-content-center"
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
                                                checked={itemRow[itemColumn?.field ?? ''][0].checked ?? checkedValue}
                                                data={itemRow[itemColumn?.field ?? ''][0].data}
                                                className="justify-content-center"
                                                onChange={(value: string[]) => handleCheckList(value)}
                                            />
                                        )
                                    ) : itemColumn.isRadio ? (
                                        itemRow[itemColumn?.field ?? ''] && (
                                            <Choice
                                                type="radio"
                                                checked={itemRow[itemColumn?.field ?? ''][0].checked ?? checkedValue}
                                                data={itemRow[itemColumn?.field ?? ''][0].data}
                                                className="justify-content-center"
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
                                            />
                                        )
                                    ) : itemColumn.isButton ? (
                                        <Button
                                            startIcon={itemRow[itemColumn?.field ?? '']['srcIcon']}
                                            className="components__table-btn w-100"
                                            background={itemRow[itemColumn?.field ?? '']['background'] ?? 'green'}
                                            onClick={itemRow[itemColumn?.field ?? '']['onClick'] ?? {}}
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

    return (
        <div className={`components__table ${className}`}>
            <div className="d-flex align-items-center bases__margin--bottom12">
                <span className={`bases__font--14 bases__text--dark-gray`}>{trans.common.table.total(total ?? 0)}</span>
                {btn}
            </div>
            <div
                ref={tableWrapperRef}
                className="components__table-wrapper bases__padding--bottom20"
                onScroll={() => handleScrollHorizontal()}
            >
                <table
                    className={`components__table-border ${isStickyColumn ? 'components__table-sticky' : ''} ${
                        isStickyColumn && !isScrollLeftEnd ? 'components__table-sticky-border' : ''
                    } ${classNameTable}`}
                >
                    <thead>{renderHeads()}</thead>
                    <tbody>{renderRows()}</tbody>
                </table>
                <Pagination
                    current={page}
                    onPageChange={(page: number) => handleChanePage(page)}
                    className="bases__margin--top24"
                    totalPage={parseInt(((total ?? 0) / 20 + 0.5).toFixed())}
                />
            </div>
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
};

export default Table;
