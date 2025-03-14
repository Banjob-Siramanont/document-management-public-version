import { useNavigate } from 'react-router-dom';
import HoverableButton from '../../common/button/HoverableButton';

type ActionButtonsProps = {
    cancelPath: string;
    actionText: string;
    onClick: () => void;
}

export default function ActionButtons({ cancelPath, actionText, onClick }: ActionButtonsProps) {

    const navigate = useNavigate();

    return (
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
    )
}
