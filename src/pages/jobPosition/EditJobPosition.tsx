import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// helper
import { editJobPositionApi, getJobPositionApi } from '../../helper/api/jobPosition';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { GetJobPositionResponse, PostJobPositionResponse } from '../../types/helper/api/jobPositionTypes';
import Loading from '../../components/Loading';

export default function EditJobPosition() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [jobPosition, setJobPosition] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editJobPosition = async () => {
        setIsLoading(true);
        try {
            const result: PostJobPositionResponse = await editJobPositionApi({ job_position_name: jobPosition }, id as string);

            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขตำแหน่งงานเป็น ${result.data.job_position_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/job-position-lists'));
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

    const handleEditJobPosition = () => {
        Swal.fire({
            title: `แก้ไขตำแหน่งงานเป็น ${jobPosition}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editJobPosition() });
    };

    const getJobPosition = async () => {
        setIsLoading(true);
        try {
            const result: GetJobPositionResponse = await getJobPositionApi(id as string);

            if (result.status === 'OK') setJobPosition(result.data.job_position_name);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getJobPosition()
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขตำแหน่งงาน' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลตำแหน่งงาน' />

                <BasicInformation
                    jobPosition={jobPosition}
                    setJobPosition={value => setJobPosition(value)}
                />

                <ActionButtons
                    cancelPath='/job-position-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditJobPosition()}
                />
            </CardPrimary>
        </>
    )
}
