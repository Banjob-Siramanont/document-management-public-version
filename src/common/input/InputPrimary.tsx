import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type InputPrimaryProps = {
    className?: string;
    tailwindBorderClassName?: string;
    labelTag?: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    value: string | number | readonly string[] | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    textHelper?: string;
    max?: number;
    min?: number;
    maxLength?: number;
};

export default function InputPrimary({
    className, tailwindBorderClassName = 'border rounded-md', labelTag, type, placeholder, value, max, min, maxLength = 250, onChange, textHelper
}: InputPrimaryProps) {

    return (
        <div className={className}>
            <div
                className={`
                    ${tailwindBorderClassName} grid grid-cols-1 px-3 py-[7px] text-sm font-light
                    border-inputColor bg-white dark:bg-intenseFadeBlack
                `}
            >
                <div className='text-inputText dark:text-inputTextDark'>{labelTag}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    className='dark:text-smoothWhite focus:outline-none py-1'
                    pattern='\d{4}-\d{2}-\d{2}'
                    value={value}
                    onChange={onChange}
                    max={max}
                    min={min}
                    maxLength={maxLength}
                />
            </div>
            <div className='text-alarmRed dark:text-alarmYellow text-[12px]'>
                {textHelper}
            </div>
        </div>
    )
}
