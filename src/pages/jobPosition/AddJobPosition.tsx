import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addJobPositionApi } from '../../helper/api/jobPosition';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';
import Loading from '../../components/Loading';

// Type
import { PostJobPositionResponse } from '../../types/helper/api/jobPositionTypes';

export default function AddJobPosition() {

    const [jobPosition, setJobPosition] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addJobPosition = async () => {
        setIsLoading(true);
        try {
            const result: PostJobPositionResponse = await addJobPositionApi({ job_position_name: jobPosition });
            if (result.status === 'OK') {
                setJobPosition('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่มตำแหน่งงาน ${result.data.job_position_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                })
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleAddJobPosition = () => {
        Swal.fire({
            title: `เพิ่มตำแหน่งงาน ${jobPosition}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addJobPosition() })
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มตำแหน่งงาน' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลตำแหน่งงาน' />

                <BasicInformation
                    jobPosition={jobPosition}
                    setJobPosition={value => setJobPosition(value)}
                />

                <ActionButtons
                    cancelPath='/job-position-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddJobPosition()}
                />
            </CardPrimary>
        </>
    )
}
