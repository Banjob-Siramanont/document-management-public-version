type TopicProps = {
    text: string;
}

export default function Topic({ text }: TopicProps) {
    return (
        <div className='text-orange mb-5 font-bold text-[40px] max-[600px]:text-[25px]'>{text}</div>
    )
}
