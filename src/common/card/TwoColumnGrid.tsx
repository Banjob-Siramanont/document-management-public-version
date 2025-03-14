import { ReactNode } from "react";

type TwoColumnGridProps = {
    className?: string;
    children: ReactNode;
};

export default function TwoColumnGrid({ className, children }: TwoColumnGridProps) {
    return (
        <div className={`grid grid-cols-2 gap-4 max-[800px]:grid-cols-1 mb-8 ${className}`}>{children}</div>
    )
}
