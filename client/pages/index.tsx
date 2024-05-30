import { createRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Choice, Table } from '@components/index';

import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { setLocale } from '@redux/actions';

import { useTrans } from '@utils/hooks';
import { images, routes } from '@utils/constants';

import { IHomePageProps, IHomePage, IHomePageState } from '@interfaces/pages/home';

const HomePage: IHomePage<IHomePageProps> = () => {
    const trans = useTrans();
    const router = useRouter();
    const dispatch = useDispatch();
    const { locale } = useSelector((states: ReduxStates) => states);
    const [state, setState] = useState<IHomePageState>({
        checkboxChecked: [],
        radioChecked: '1',
    });
    const { checkboxChecked, radioChecked } = state;
    const tableRef = createRef<ITableComponentHandle>();

    const changeLanguage = (lang: string) => {
        dispatch(setLocale(lang));
    };

    const handleTableDatas = () => {
        // data is from API, this is just a mock
        const data = [
            {
                id: 1,
                field_1: 'Value Column 1, Row 1',
                field_2: 'Value Column 2, Row 1',
                field_3: 'Value Column 3, Row 1',
            },
            {
                id: 2,
                field_1: 'Value Column 1, Row 2',
                field_2: 'Value Column 2, Row 2',
                field_3: 'Value Column 3, Row 2',
            },
        ];
        return data.map((data) => {
            return {
                ...data,
                checkbox: [
                    {
                        type: 'checkbox',
                        data: [
                            {
                                id: `table_data_${data.id}`,
                                value: data.id.toString(),
                            },
                        ],
                    },
                ],
                detail_btn: {
                    srcIcon: images.ICON_DETAIL,
                    onClick: () => console.log('detail', data.id),
                },
                delete_btn: {
                    srcIcon: images.ICON_DELETE,
                    onClick: () => console.log('delete', data.id),
                    background: 'red',
                },
            };
        });
    };

    const table = {
        heads: [
            {
                isCheckbox: true,
                dataCheckbox: [
                    {
                        data: [
                            {
                                id: 'checkAll',
                                value: 'all',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Field 1',
                isSort: true,
            },
            {
                title: 'Field 2',
                isSort: true,
            },
            {
                title: 'Field 3',
                isSort: true,
            },
            {
                title: 'Detail',
                className: 'text-center',
            },
            {
                title: 'Delete',
                className: 'text-center',
            },
        ],
        body: {
            columns: [
                {
                    field: 'checkbox',
                    isInput: false,
                    isCheckbox: true,
                },
                {
                    field: 'field_1',
                },
                {
                    field: 'field_2',
                },
                {
                    field: 'field_3',
                },
                {
                    field: 'detail_btn',
                    isButton: true,
                },
                {
                    field: 'delete_btn',
                    isButton: true,
                },
            ],
            rows: handleTableDatas(),
        },
    };

    return (
        <div className="pages__home container">
            <div>{trans.home.title}</div>
            <div>Current locale: {locale}</div>
            <Button className="mb-3" buttonText="Change Japanese" onClick={() => changeLanguage('jp')} />
            <Button className="mb-3" buttonText="Change English" onClick={() => changeLanguage('en')} />
            <Button
                onClick={() =>
                    router.push(
                        {
                            pathname: routes.CLIENT.LOGIN.href,
                        },
                        undefined,
                        { scroll: false },
                    )
                }
                buttonText="Redirect Login"
            />
            <Choice
                type="checkbox"
                data={[
                    {
                        id: 'check_1',
                        label: 'Check 1',
                        value: '1',
                    },
                    {
                        id: 'check_2',
                        label: 'Check 2',
                        value: '2',
                    },
                    {
                        id: 'check_3',
                        label: 'Check 3',
                        value: '3',
                    },
                ]}
                onChange={(value: string[]) =>
                    setState((prevState) => ({
                        ...prevState,
                        checkboxChecked: value,
                    }))
                }
                checked={checkboxChecked}
            />
            <Choice
                type="radio"
                data={[
                    {
                        id: 'radio_1',
                        label: 'Radio 1',
                        value: '1',
                    },
                    {
                        id: 'radio_2',
                        label: 'Radio 2',
                        value: '2',
                    },
                    {
                        id: 'radio_3',
                        label: 'Radio 3',
                        value: '3',
                    },
                ]}
                onChange={(value: string[]) =>
                    setState((prevState) => ({
                        ...prevState,
                        radioChecked: value[0],
                    }))
                }
                checked={[radioChecked]}
            />
            <Table
                ref={tableRef}
                total={61}
                heads={table.heads}
                body={table.body}
                onChangeCheckList={(value: string[]) => console.log(value)}
                onChangePage={(page: number) => console.log(page)}
            />
        </div>
    );
};

export default HomePage;
