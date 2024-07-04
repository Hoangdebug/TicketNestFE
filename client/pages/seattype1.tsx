import SeatType1 from '@components/layouts/SeatType1';
import { ISeatType1Page, ISeatType1PageProps } from '@interfaces/pages/SeatType1';
import { routes } from '@utils/constants';
import { authHelper } from '@utils/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SeatType1Page: ISeatType1Page<ISeatType1PageProps> = () => {
    const router = useRouter();
    const token = authHelper.accessToken();

    useEffect(() => {
        if (!token) {
            router.push(routes.CLIENT.LOGIN_PAGE.href, undefined, { scroll: false });
        }
    }, []);

    return (
        <>
            <div className="bg-slate-700 flex p-4">{/* <IoChevronBackCircleOutline size={25} color="white" /> */}</div>
            <div className="flex flex-col justify-start items-center h-[100vh] mt-0 bg-slate-700">
                <ul className="bg-slate-700 pt-5 rounded-lg flex justify-center items-center gap-10 list-none">
                    <li className="flex justify-center items-center gap-2 my-10 text-white">
                        <div className="h-[30px] w-[35px] m-[5px] bg-slate-800 rounded-t-xl"></div>
                        <small className="font-thin text-xl">Empty</small>
                    </li>
                    <li className="flex justify-center items-center gap-2 my-10 text-white">
                        <div className="h-[30px] w-[35px] m-[5px] bg-yellow-500 bg-slate-800 rounded-t-xl"></div>
                        <small className="font-thin text-xl">VIP</small>
                    </li>
                    <li className="flex justify-center items-center gap-2 my-10">
                        <div className="h-[30px] w-[35px] m-[5px] bg-green-500 rounded-t-xl"></div>
                        <small className="font-thin text-xl text-white">Selected</small>
                    </li>
                    <li className="flex justify-center items-center gap-2 my-10">
                        <div className="h-[30px] w-[35px] m-[5px] bg-white rounded-t-xl"></div>
                        <small className="font-thin text-xl text-white">Ordered</small>
                    </li>
                </ul>

                <SeatType1 />
            </div>
        </>
    );
};

export default SeatType1Page;
