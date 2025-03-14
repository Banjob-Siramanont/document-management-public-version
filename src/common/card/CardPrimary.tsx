import { ReactNode } from 'react';

type CardPrimaryProps = {
    className?: string;
    children: ReactNode;
};

export default function CardPrimary({ className, children }: CardPrimaryProps) {
    return (
        <div className={`shadow rounded-lg w-full bg-white dark:bg-intenseFadeBlack p-4 ${className}`}>
            {children}
        </div>
    )
}
