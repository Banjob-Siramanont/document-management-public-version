import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addVehicleModelApi } from '../../helper/api/vehicleModel';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { PostVehicleModelResponse } from '../../types/helper/api/vehicleModelTypes';
import Loading from '../../components/Loading';

export default function AddVehicleModel() {

    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<string>('');
    const [vehicleModelEngName, setVehicleModelEngName] = useState<string>('');
    const [vehicleModelThaiName, setVehicleModelThaiName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addVehicleModel = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_brand: selectedVehicleBrand,
            vehicle_model_eng_name: vehicleModelEngName,
            vehicle_model_thai_name: vehicleModelThaiName
        };
        try {
            const result: PostVehicleModelResponse = await addVehicleModelApi(dataToSend);
            if (result.status === 'OK') {
                setVehicleModelEngName('');
                setVehicleModelThaiName('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่ม ${result.data.vehicle_model_eng_name}`,
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

    const handleAddVehicleModel = () => {
        Swal.fire({
            title: `เพิ่มรุ่น ${vehicleModelEngName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addVehicleModel() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มรุ่นรถ' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลรุ่นรถ' />

                <BasicInformation
                    selectedVehicleBrand={selectedVehicleBrand}
                    setSelectedVehicleBrand={value => setSelectedVehicleBrand(value)}
                    vehicleModelEngName={vehicleModelEngName}
                    setVehicleModelEngName={value => setVehicleModelEngName(value)}
                    vehicleModelThaiName={vehicleModelThaiName}
                    setVehicleModelThaiName={value => setVehicleModelThaiName(value)}
                />

                <ActionButtons
                    cancelPath='/vehicle-model-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddVehicleModel()}
                />
            </CardPrimary>
        </>
    )
}
