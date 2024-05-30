import { useState, useEffect } from 'react';
import AppContext from 'next/app';
import smoothscroll from 'smoothscroll-polyfill';
import Head from 'next/head';

import { App } from '@components/index';

import { reduxWrapper } from '@redux/store';

import { useTrans } from '@utils/hooks';

import { IAppPage, IAppPageProps } from '@interfaces/pages/app';

import '@styles/scss/main.scss';

const AppPage: IAppPage<IAppPageProps> = (props) => {
    const trans = useTrans();
    const { Component, pageProps, statusCode, title } = props;
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [code, setCode] = useState<number | undefined>(statusCode);

    useEffect(() => {
        if (statusCode) {
            setCode(code);
        }
    }, [statusCode]);

    useEffect(() => {
        smoothscroll.polyfill();

        loadPage();
    }, []);

    const loadPage = () => {
        setPageLoading(true);
        const interval = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(interval);
                setPageLoading(false);
            }
        }, 100);
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>{title ?? trans.common.page_title}</title>
            </Head>
            {!pageLoading && (
                <App statusCode={code}>
                    <Component {...pageProps} />
                </App>
            )}
        </>
    );
};

AppPage.getInitialProps = async ({ Component, ctx }: AppContext) => {
    let statusCode: number | undefined;
    const { res, err, pathname, asPath } = ctx;
    if (res) {
        statusCode = res.statusCode;
    } else if (err) {
        statusCode = err.statusCode;
    }

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        },
        statusCode,
        url: {
            pathname,
            asPath: asPath?.substring(1, asPath.length),
        },
    };
};

export default reduxWrapper.withRedux(AppPage);
