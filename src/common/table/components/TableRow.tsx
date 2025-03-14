import { Data, FormattedDataKey, TableHead } from '../../../types/common/tableTypes';

type TableRowProps = {
    idx: number;
    tHeadDatas: TableHead[];
    formattedDataKey?: FormattedDataKey;
    element: Data;
}

export default function TableRow({ idx, tHeadDatas, formattedDataKey, element }: TableRowProps) {

    const keyName = formattedDataKey?.keyName || '';

    return (
        <td
            className='py-2 px-1.5 border-r dark:border-black border-lightGrey'
            style={{ textAlign: tHeadDatas[idx].cssTextAlign }}
        >
            {element[keyName]}
        </td>
    )
}
