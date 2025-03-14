import { useEffect, Dispatch, SetStateAction } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { Data } from '../../../types/common/tableTypes';

type TableFooterProps = {
    range: number[];
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    slice: Data;
}

export default function TableFooter({ range, setPage, page, slice }: TableFooterProps) {

    useEffect(() => {
        if (slice.length < 1 && page !== 1) setPage(page - 1);
    }, [slice, page, setPage]);

    return (
        <>
            <div className='flex items-center justify-end flex-wrap'>
                <div
                    className='dark:text-smoothWhite cursor-pointer mr-1'
                    onClick={() => { if (page !== 1) setPage(page - 1) }}
                >
                    <FiChevronLeft />
                </div>

                <div
                    className='dark:text-smoothWhite cursor-pointer ml-1'
                    onClick={() => { if (page < range[range.length - 1]) setPage(page + 1) }}
                >
                    <FiChevronRight />
                </div>
            </div>
        </>
    );
};
