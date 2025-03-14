import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

// Component
import InputPrimary from '../../input/InputPrimary';
import { Data, FormattedDataKey } from '../../../types/common/tableTypes';

type TableSearchProps = {
    rawData: Data[];
    formattedDataKeys: FormattedDataKey[];
    setFilteredData: Dispatch<SetStateAction<Data[]>>;
}

export default function TableSearch({ rawData, formattedDataKeys, setFilteredData }: TableSearchProps) {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') setFilteredData(rawData);
        else {
            const filtered = rawData.filter(row =>
                formattedDataKeys.some(key =>
                    key.keyName && row[key.keyName]?.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        handleSearch(searchQuery);
    }, [rawData]);

    return (
        <div className='flex justify-end items-start'>
            <div className='flex justify-center items-center gap-2'>
                <IoSearch className='text-orange' />
                <InputPrimary
                    type='text'
                    placeholder='ค้นหา'
                    value={searchQuery}
                    onChange={event => handleSearch(event.target.value)}
                />
            </div>
        </div>
    )
}
