import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { Option } from '../../types/store/reducer/commonTypes';

type SelectPrimaryProps = {
    className?: string;
    tailwindBorderClassName?: string;
    isBottomBorderFormat?: boolean;
    labelTag?: string;
    optionDatas: Option[];
    selectedValue: string | number;
    keyValue?: string;
    keyDisplayValue?: string;
    textHelper?: string;
    onChange: (data: string | number) => void;
}

export default function SelectPrimary({
    className, tailwindBorderClassName = 'border rounded-md', isBottomBorderFormat = false, labelTag, optionDatas, selectedValue, keyValue = 'value', keyDisplayValue = 'displayValue', textHelper, onChange
}: SelectPrimaryProps) {
    const buttonRef = useRef<HTMLFormElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [onDrop, setOnDrop] = useState<boolean>(false);
    const [dropdownTop, setDropdownTop] = useState<number | null>(0);

    const calculatePosition = () => {
        if (!buttonRef.current || !contentRef.current) return;

        const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
        const contentHeight = contentRef.current.clientHeight;
        const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

        setDropdownTop(topPosition);
    };

    const handleToggleDropdown = () => {
        setOnDrop(previous => !previous);
        calculatePosition();
    };

    useEffect(() => {
        calculatePosition();
    }, [optionDatas]);

    return (
        <div className={`dark:text-smoothWhite font-light relative ${className}`} tabIndex={0} onBlur={() => setTimeout(() => setOnDrop(false), 150)}>
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
                    absolute mt-1 z-[10] px-5 py-3 text-sm w-full max-h-[40vh] bg-white dark:bg-intenseFadeBlack border-[2px] border-inputColor shadow overflow-hidden overflow-y-auto rounded-lg
                    transform transition-transform duration-[250ms] ease-in-out
                    ${onDrop ? 'translate-y-0' : 'translate-y-[-5%] opacity-0 pointer-events-none'}
                `}
                style={{ top: dropdownTop ? `${dropdownTop}px` : 'auto' }}
            >
                {optionDatas?.map(optionData => {
                    return (
                        <div
                            className='hover:bg-orange hover:text-smoothWhite transition-all cursor-pointer'
                            key={optionData[keyValue]}
                            onClick={() => {
                                setOnDrop(false);
                                onChange(optionData[keyValue]);
                            }}
                        >
                            {optionData[keyDisplayValue]}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
