import { MouseEventHandler, ReactNode } from 'react';

// css
import '../../index.css';

type HoverableButtonProps = {
    className?: string
    text: string
    textColor: string;
    bgColor: string;
    borderColor: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    reactIcon?: ReactNode;
}

export default function HoverableButton({
    className = '',
    text,
    textColor,
    bgColor,
    borderColor,
    onClick = () => { },
    disabled = false,
    reactIcon = '',
}: HoverableButtonProps) {

    return (
        <button
            onClick={onClick}
            className={`
                ${className}
                flex justify-center items-center gap-x-1.5 rounded-lg px-4 py-1 select-none break-all transition-colors duration-150
                ${disabled ?
                    'bg-lightGrey border border-lightGrey text-grey' :
                    `clickable cursor-pointer bg-white dark:bg-intenseFadeBlack border ${borderColor} ${textColor} hover:${bgColor} hover:text-white`
                }
            `}
            disabled={disabled}
        >
            {reactIcon}
            {text}
        </button>
    )
}

/*
    tailwind safelist
    hover:bg-alarmRed
    hover:bg-roseRed
    hover:bg-emeraldGreen
    hover:bg-alarmYellow
*/