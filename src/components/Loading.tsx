
type LoadingProps = {
    isLoading: boolean;
};

export default function Loading({ isLoading }: LoadingProps) {
    if (!isLoading) return null;

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 opacity-40 bg-black flex justify-center items-center z-50'>
            <div className='animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full opacity-100'></div>
        </div>
    );
}
