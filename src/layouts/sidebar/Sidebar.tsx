import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import menuDatas from './menuDatas.json';

// Type
import { BaseMenuItem, Menu } from '../../types/layouts/sidebarTypes';

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = location.pathname;

    const handleMenuOnClick = (menuData: Menu, index: number) => {
        if (menuData.submenu.length < 1) return navigate(menuData.path);

        if (selectedMenuIndex !== index && isOpen) setSelectedMenuIndex(index)
        else {
            setSelectedMenuIndex(index)
            setIsOpen(previous => !previous)
        }
    };

    const hasBackroundColor = (item: BaseMenuItem) => {
        if (currentLocation === item.path) return true;
        return item.relatePath.some(path => path === currentLocation);
    };

    return (
        <div className='relative shadow bg-white dark:bg-intenseFadeBlack px-1 py-2 min-h-sidebarHeight'>
            <div className='sticky top-2.5 dark:text-smoothWhite'>
                {menuDatas?.map((menuData, index) => {
                    return (
                        <div key={`${index}-${menuData.id}`}>
                            <div
                                className={`flex justify-start items-center text-base text-orange hover:bg-orange hover:text-white p-2 rounded-lg cursor-pointer ${hasBackroundColor(menuData) ? 'bg-orange text-white' : ''}`}
                                onClick={() => handleMenuOnClick(menuData, index)}
                            >
                                <div className='flex justify-between items-center w-full'>
                                    {menuData.menu}
                                    {menuData.submenu.length > 0 && (
                                        <FaAngleDown className={`${(isOpen && selectedMenuIndex === index) ? 'rotate-180 duration-300 transform' : 'transform duration-300'}`} />
                                    )}
                                </div>
                            </div>
                            <div className='h-[1px] w-full bg-lightGrey dark:bg-smoothWhite' />
                            {isOpen && (selectedMenuIndex === index) && (
                                <div className='flex flex-col text-base text-orange'>
                                    {menuData.submenu.map((subItem, index) => {
                                        return <div
                                            key={`${index}-${subItem.id}`}
                                            className={`flex items-center w-full hover:bg-orange hover:text-white px-4 py-2 rounded-lg cursor-pointer ${hasBackroundColor(subItem) ? 'bg-orange text-white' : ''}`}
                                            onClick={() => navigate(subItem.path)}
                                        >
                                            - {subItem.menu}
                                        </div>
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}