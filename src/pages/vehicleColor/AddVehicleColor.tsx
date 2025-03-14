import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addVehicleColorApi } from '../../helper/api/vehicleColor';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { PostVehicleColorResponse } from '../../types/helper/api/vehicleColorTypes';
import Loading from '../../components/Loading';

export default function AddVehicleColor() {

    const [vehicleColor, setVehicleColor] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addVehicleColor = async () => {
        setIsLoading(true);
        try {
            const result: PostVehicleColorResponse = await addVehicleColorApi({ vehicle_color_name: vehicleColor });
            if (result.status === 'OK') {
                setVehicleColor('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่ม ${result.data.vehicle_color_name}`,
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


    const handleAddVehicleColor = () => {
        Swal.fire({
            title: `เพิ่มสี ${vehicleColor}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addVehicleColor() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มสี' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลสี' />

                <BasicInformation
                    vehicleColor={vehicleColor}
                    onChange={value => setVehicleColor(value)}
                />

                <ActionButtons
                    cancelPath='/vehicle-color-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddVehicleColor()}
                />
            </CardPrimary>
        </>
    )
}
