import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { Option } from '../../types/store/reducer/commonTypes';

type SelectSearchProps = {
    className?: string;
    tailwindBorderClassName?: string
    isBottomBorderFormat?: boolean;
    labelTag?: string;
    optionDatas: Option[];
    selectedValue: string | number;
    keyValue?: string;
    keyDisplayValue?: string;
    textHelper?: string;
    onChange: (data: string | number) => void;
}

export default function SelectSearch({
    className, tailwindBorderClassName = 'border rounded-md', isBottomBorderFormat = false, labelTag, optionDatas, selectedValue, keyValue = 'value', keyDisplayValue = 'displayValue', textHelper, onChange
}: SelectSearchProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLFormElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [onDrop, setOnDrop] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [dropdownTop, setDropdownTop] = useState<number | null>(0);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef?.current && !dropdownRef?.current.contains(event.target as Node)) {
            setOnDrop(false);
        }
    };

    const calculatePosition = () => {
        if (!buttonRef.current || !contentRef.current) return;

        const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
        const contentHeight = contentRef.current.clientHeight + 36; // 36 px คือค่าความสูงของกล่องข้อความค้นหา
        const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

        setDropdownTop(topPosition);
    };

    const handleToggleDropdown = () => {
        setOnDrop(previous => !previous);
        calculatePosition();
    };

    const filteredDatas = optionDatas.filter(optionData =>
        optionData[keyDisplayValue]?.toLowerCase().includes(searchValue?.toLowerCase())
    );

    useEffect(() => {
        if (onDrop) document.addEventListener('mousedown', handleClickOutside);
        else document.removeEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onDrop]);

    useEffect(() => {
        calculatePosition();
    }, [optionDatas, searchValue]);

    useEffect(() => {
        if (onDrop && inputRef.current) {
            inputRef.current.focus();
        }
    }, [onDrop]);

    return (
        <div className={`dark:text-smoothWhite font-light relative ${className}`} ref={dropdownRef}>
            <form
                ref={buttonRef}
                className={`${tailwindBorderClassName} border-inputColor px-3 pt-2 ${isBottomBorderFormat ? 'pb-1.5' : 'pb-0.5'} w-full transition-all duration-500 overflow-x-auto bg-white dark:bg-intenseFadeBlack`}
                onClick={() => handleToggleDropdown()}
            >
                <label className='text-sm text-inputText dark:text-inputTextDark'>{labelTag}</label>
                <div className={`${(selectedValue === '' && isBottomBorderFormat) ? 'text-alarmRed dark:text-alarmYellow' : ''} flex justify-between items-center py-1 text-sm whitespace-nowrap`}>
                    {filteredData(optionDatas, selectedValue, keyValue, keyDisplayValue)}
                    <FaAngleDown className={`${onDrop ? 'rotate-180' : ''} duration-300`} />
                </div>
            </form>
            <div className='flex w-full'>
                <span className='text-alarmRed dark:text-alarmYellow text-[12px] font-normal'>{textHelper}</span>
            </div>

            <div
                ref={contentRef}
                className={`
                    absolute pb-2 mt-1 z-[30] text-sm w-full max-h-[40vh] bg-white dark:bg-intenseFadeBlack border-[2px] border-inputColor shadow overflow-hidden overflow-y-auto rounded-lg
                    transform transition-transform duration-200 ease-in-out
                    ${onDrop ? 'translate-y-0' : 'translate-y-[-5%] opacity-0 pointer-events-none'}
                `}
                style={{ top: dropdownTop ? `${dropdownTop}px` : 'auto' }}
            >
                <div className={`${onDrop ? '' : 'hidden'} px-5 py-2 border-b border-inputColor mb-1 sticky top-0 bg-white dark:bg-intenseFadeBlack z-[20]`}>
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder='ค้นหา'
                        className='w-full outline-0 text-sm'
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                    />
                </div>
                {filteredDatas?.map(filteredData => {
                    return (
                        <div
                            className='px-5 hover:bg-orange hover:text-smoothWhite transition-all cursor-pointer'
                            key={filteredData[keyValue]}
                            onClick={() => {
                                setOnDrop(false);
                                onChange(filteredData[keyValue]);
                            }}
                        >
                            {filteredData[keyDisplayValue]}
                        </div>
                    )
                })}
                <div className={`px-5 ${filteredDatas.length === 0 ? '' : 'hidden'}`}>ไม่มีข้อมูล</div>
            </div>
        </div>
    )
}
