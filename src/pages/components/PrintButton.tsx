
export default function PrintButton({ text }: { text: string }) {
    return (
        <button
            className='
                    text-orange border border-orange bg-white dark:bg-intenseFadeBlack rounded-lg px-2 py-1 transition-all duration-150 my-5
                    hover:text-white hover:bg-orange
                '
            onClick={() => window.print()}
        >
            {text}
        </button>
    )
}
