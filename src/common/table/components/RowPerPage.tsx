import { ChangeEvent } from "react";

type RowPerPageProps = {
    page: number;
    selectedRowPerPage: number;
    handleSelectRowOnChange: (newRowsPerPage: number, newPage: number) => void;
}

export default function RowPerPage({ page, selectedRowPerPage, handleSelectRowOnChange }: RowPerPageProps) {
    const rowOptions = [5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 150, 200, 500, 1000, 2000, 3000, 9999];

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);

        const currentFirstRow = (page - 1) * selectedRowPerPage + 1;
        const newPage = Math.ceil(currentFirstRow / newRowsPerPage);

        handleSelectRowOnChange(newRowsPerPage, newPage)
    };

    return (
        <div className='flex justify-end items-center flex-wrap text-xs'>
            <div className='mr-1 text-grey'>Rows per page:</div>
            <select
                className='text-xs mr-4 text-center dark:text-smoothWhite'
                value={selectedRowPerPage}
                onChange={handleOnChange}
            >
                {rowOptions.map(rowOption => (
                    <option key={rowOption} value={rowOption}>
                        {rowOption}
                    </option>
                ))}
            </select>
        </div>
    )
}
