import { FiEdit3 } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';

// Component
import HoverableButton from '../../button/HoverableButton';

// Type
import { Data } from '../../../types/common/tableTypes';

type TableActionButtonsProps = {
    editButtonText?: string;
    extraButtonText?: string;
    deleteButtonText?: string;
    hasEditBtn?: boolean;
    hasExtraBtn?: boolean;
    hasDeleteBtn?: boolean;
    element: Data;
    keyNameOfId: string;
    editOnClick: (id: string | number) => void;
    extraOnClick?: (id: string | number) => void;
    deleteOnClick: (id: string | number) => void;
}

export default function TableActionButtons({
    editButtonText = 'แก้ไข',
    extraButtonText = '',
    deleteButtonText = 'ลบ',
    hasEditBtn = true,
    hasExtraBtn = false,
    hasDeleteBtn = true,
    element,
    keyNameOfId,
    editOnClick = () => { },
    extraOnClick = () => { },
    deleteOnClick = () => { },
}: TableActionButtonsProps) {
    return (
        <div className='flex justify-between items-center gap-2'>
            {hasEditBtn && (
                <HoverableButton
                    className='text-sm'
                    text={editButtonText}
                    textColor='text-orange'
                    bgColor='bg-orange'
                    borderColor='border-orange'
                    reactIcon={<FiEdit3 />}
                    onClick={() => editOnClick(element[keyNameOfId])}
                />
            )}
            {hasExtraBtn && (
                <HoverableButton
                    className='text-sm'
                    text={extraButtonText}
                    textColor='text-emeraldGreen'
                    bgColor='bg-emeraldGreen'
                    borderColor='border-emeraldGreen'
                    onClick={() => extraOnClick(element[keyNameOfId])}
                />
            )}
            {hasDeleteBtn && (
                <HoverableButton
                    className='text-sm'
                    text={deleteButtonText}
                    textColor='text-roseRed'
                    bgColor='bg-roseRed'
                    borderColor='border-roseRed'
                    reactIcon={<FaRegTrashCan />}
                    onClick={() => deleteOnClick(element[keyNameOfId])}
                />
            )}
        </div>
    )
}
