import { useRouter } from 'next/router';
import { en, jp } from '@utils/lang';

const useTrans = () => {
    const { locale } = useRouter();

    const trans = locale === 'jp' ? jp : en;

    return trans;
};

export default useTrans;
