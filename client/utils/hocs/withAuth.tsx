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
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
        const token = authHelper.accessToken();
        useEffect(() => {
            if (!profile || !token) {
                setIsLoading(true);
                return;
            }

            const isAdminOrOrganizer = profile.role === enums.ROLE.ADMIN || profile.role === enums.ROLE.ORGANIZER;
            setIsAuthorized(isAdminOrOrganizer);
            setIsLoading(false);

            if (!isAdminOrOrganizer) {
                router.push(routes.CLIENT.ERROR403_PAGE.href, undefined, { scroll: false });
            }
        }, [profile, token, router]);

        useEffect(() => {
            const checkAuth = async () => {
                if (!token) {
                    await router.replace(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
                    return;
                }
                if (profile) {
                    const isAdminOrOrganizer = profile.role === enums.ROLE.ADMIN || profile.role === enums.ROLE.ORGANIZER;
                    setIsAuthorized(isAdminOrOrganizer);
                    setIsLoading(false);
                }
            };

            checkAuth();
        }, [profile, token, router]);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isAuthorized === false) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
