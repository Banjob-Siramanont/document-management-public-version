import { useState } from 'react';
import { FaAngleUp } from 'react-icons/fa6';

// css
import styles from '../Table.module.css';
import { Data, TableHead } from '../../../types/common/tableTypes';

type TableHeaderProps = {
    tHeadDatas: TableHead[];
    rawData: Data[];
    setRawData: (newData: Data[]) => void;
}

export default function TableHeader({ tHeadDatas, rawData, setRawData }: TableHeaderProps) {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);

    const handleSortColumn = (columnKeyName: string) => {
        if (sortedColumn === columnKeyName) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        else {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortedColumn(columnKeyName);
        }
        const newData = rawData.slice().sort((item1: Data, item2: Data) => {
            const valA = typeof item1[columnKeyName] === 'string' ? item1[columnKeyName].toLowerCase() : item1[columnKeyName];
            const valB = typeof item2[columnKeyName] === 'string' ? item2[columnKeyName].toLowerCase() : item2[columnKeyName];

            if (sortOrder === 'asc') return valA < valB ? -1 : 1;
            else return valA > valB ? -1 : 1;
        });
        setRawData(newData);
    };

    return (
        <thead>
            <tr>
                {tHeadDatas.map((tHeadData, index) => (
                    <th
                        key={index}
                        className={`${styles.tableHeader} dark:text-smoothWhite bg-white dark:bg-intenseFadeBlack border-r border-lightGrey dark:border-black`}
                        style={{ textAlign: tHeadData.cssTextAlign }}
                        onClick={() => tHeadData.key && handleSortColumn(tHeadData.key)}
                    >
                        {tHeadData.tHeadTiltle}
                        {sortedColumn === tHeadData.key && (
                            <FaAngleUp
                                className={`${sortOrder === 'asc' ? '' : 'rotate-180'} ml-2 inline transition-all duration-300`}
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
