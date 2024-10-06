import Box from '@components/commons/Box';
import Button from '@components/commons/Button';
import { setSidebar } from '@redux/actions';
import { ReduxStates } from '@redux/reducers';
import { images } from '@utils/constants';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HeaderAdminComponents: IAdminHeaderSideBarComponents<IAdminHeaderSideBarComponentsProps> = () => {
    const dispatch = useDispatch();
    const { profile, sidebar } = useSelector((states: ReduxStates) => states);

    return (
        <Box className='bases__background--white bases__padding--x-20 bases__padding10'>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex align-items-center flex-row'>
                    <div>
                        <Button 
                            background='white'
                            startIcon={images?.ICON_MENU_ADMIN}
                            iconColor='black'
                            // onClick={() => {
                            //     dispatch(setSidebar({isSidebarShow: !sidebar.isSidebarShow}))
                            // }}
                        />
                    </div>
                    <div>
                        <p className='m-0'>Welcome! <span className='fw-bolder'>{profile?.username}</span> </p>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default HeaderAdminComponents;
