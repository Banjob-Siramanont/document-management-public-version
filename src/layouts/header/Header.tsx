// Component
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../../store/Store';
import { setSidebarDatas } from '../../store/reducer/sidebarSlice/SidebarSlice';
import { useDispatch, useSelector } from 'react-redux';

import Theme from './components/Theme';

export default function Header() {

    const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarDataStateValue);
    const dispatch = useDispatch<AppDispatch>();

    const handleHamburgerOnClick = useCallback(() => {
        setTimeout(() => {
            dispatch(setSidebarDatas({ value: !isSidebarOpen, variableName: 'isSidebarOpen' }));
        }, 100);
    }, [isSidebarOpen, dispatch]);

    return (
        <div className='shadow bg-white h-headerHeight dark:bg-intenseFadeBlack flex justify-between items-center px-4 sticky top-0 z-200'>
            <div className='clickable'>
                <div
                    onClick={() => handleHamburgerOnClick()}
                    className='flex flex-col cursor-pointer gap-1.5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-black'
                >
                    <span className='block w-6 h-0.5 bg-orange'></span>
                    <span className='block w-6 h-0.5 bg-orange'></span>
                    <span className='block w-6 h-0.5 bg-orange'></span>
                </div>
            </div>
            <div className='text-orange'>K.T. Yanyont</div>
            <Theme className='cursor-pointer' />
        </div>
    )
}