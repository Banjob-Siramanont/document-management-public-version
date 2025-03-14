// Component
import { useNavigate } from 'react-router-dom';
import HoverableButton from '../../common/button/HoverableButton';

type ActionButtonsForMultipleProps = {
    actionText: string;
    cancelPath: string;
    addText: string;
    deleteText: string;
    addOnClick: () => void;
    deleteOnClick: () => void;
    onClick: () => void;
};

export default function ActionButtonForMultiple({ actionText, cancelPath, addText, deleteText, addOnClick, deleteOnClick, onClick }: ActionButtonsForMultipleProps) {

    const navigate = useNavigate();

    return (
        <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-x-2'>
                <HoverableButton
                    text={addText}
                    textColor='text-orange'
                    bgColor='bg-orange'
                    borderColor='border-orange'
                    onClick={() => addOnClick()}
                />
                <HoverableButton
                    text={deleteText}
                    textColor='text-roseRed'
                    bgColor='bg-roseRed'
                    borderColor='border-roseRed'
                    onClick={() => deleteOnClick()}
                />
            </div>
            <div className='flex justify-end items-center gap-x-2'>
                <HoverableButton
                    text='ยกเลิก'
                    textColor='text-roseRed'
                    bgColor='bg-roseRed'
                    borderColor='border-roseRed'
                    onClick={() => navigate(cancelPath)}
                />
                <HoverableButton
                    text={actionText}
                    textColor='text-orange'
                    bgColor='bg-orange'
                    borderColor='border-orange'
                    onClick={() => onClick()}
                />
            </div>
        </div>
    )
}
