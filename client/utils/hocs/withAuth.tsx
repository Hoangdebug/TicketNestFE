// hocs/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';
import { enums, routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const { profile } = useSelector((states: ReduxStates) => states);
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(true);
        const [isAuthorized1, setIsAuthorized1] = useState<boolean | null>(true);

        const adminRouters: string[] = [routes.CLIENT.ADMIN_PAGE.href, routes.CLIENT.ADMIN_CREATE_ACCOUNT_PAGE.href];
        const userRouters: string[] = [routes.CLIENT.HOME_PAGE.href];
        const token = authHelper.accessToken();

        useEffect(() => {
            if (profile && authHelper.accessToken()) {
                const isAdmin = profile?.role === enums.ROLE.ADMIN;
                setIsAuthorized1(isAdmin);

                if (!isAdmin) {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            }
        }, [profile, router]);

        useEffect(() => {
            if (isAuthorized1 && !isAuthorized && adminRouters.includes(router.pathname)) {
                router.push(routes.CLIENT.ERROR403_PAGE.href, undefined, { scroll: false });
            } else if ((isAuthorized1 && !isAuthorized) || (!isAuthorized1 && !isAuthorized && userRouters.includes(router.pathname))) {
                router.push(routes.CLIENT.ERROR403_PAGE.href, undefined, { scroll: false });
            }
        }, [isAuthorized, isAuthorized1]);

        useEffect(() => {
            const checkAuth = async () => {
                if (!token) {
                    await router.replace(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
                    setIsLoading(false);
                    return;
                }

                if (profile) {
                    const isAdmin = profile?.role === enums.ROLE.ADMIN;
                    setIsAuthorized(isAdmin);
                }

                setIsLoading(false);
            };

            checkAuth();
        }, [profile, token, router]);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isAuthorized === false) {
            // router.push(routes.CLIENT.NO_ACCESS.href, undefined, {scroll: false});
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
