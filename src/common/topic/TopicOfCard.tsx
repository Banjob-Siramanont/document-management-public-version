type TopicOfCardProps = {
    className?: string;
    text: string;
};

export default function TopicOfCard({ className, text }: TopicOfCardProps) {
    return (
        <div className={`font-semibold text-xl text-orange mb-2 ${className}`}>
            {text}
        </div>
    )
}
