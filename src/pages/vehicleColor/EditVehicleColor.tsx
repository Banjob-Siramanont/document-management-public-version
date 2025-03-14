import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { editVehicleColorApi, getVehicleColorApi } from '../../helper/api/vehicleColor';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { PostVehicleColorResponse } from '../../types/helper/api/vehicleColorTypes';
import Loading from '../../components/Loading';

export default function EditVehicleColor() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const [vehicleColor, setVehicleColor] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editVehicleColor = async () => {
        setIsLoading(true);
        try {
            const result: PostVehicleColorResponse = await editVehicleColorApi({ vehicle_color_name: vehicleColor }, id as string);

            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขสีเป็น ${result.data.vehicle_color_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/vehicle-color-lists'));
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

    const handleEditVehicleColor = () => {
        Swal.fire({
            title: `แก้ไขสีเป็น ${vehicleColor}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editVehicleColor() });
    };

    const getVehicleColor = async () => {
        setIsLoading(true);
        try {
            const result: PostVehicleColorResponse = await getVehicleColorApi(id as string);

            if (result.status === 'OK') return setVehicleColor(result.data.vehicle_color_name);
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
        getVehicleColor();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขสี' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลสี' />

                <BasicInformation
                    vehicleColor={vehicleColor}
                    onChange={value => setVehicleColor(value)}
                />

                <ActionButtons
                    cancelPath='/vehicle-color-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditVehicleColor()}
                />
            </CardPrimary>
        </>
    )
}
