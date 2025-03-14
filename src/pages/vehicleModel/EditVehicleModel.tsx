import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { editVehicleModelApi, getVehicleModelApi } from '../../helper/api/vehicleModel';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { GetVehicleModelResponse, PostVehicleModelResponse } from '../../types/helper/api/vehicleModelTypes';
import Loading from '../../components/Loading';

export default function EditVehicleModel() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<string>('');
    const [vehicleModelEngName, setVehicleModelEngName] = useState<string>('');
    const [vehicleModelThaiName, setVehicleModelThaiName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editVehicleModel = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_brand: selectedVehicleBrand,
            vehicle_model_eng_name: vehicleModelEngName,
            vehicle_model_thai_name: vehicleModelThaiName
        };
        try {
            const result: PostVehicleModelResponse = await editVehicleModelApi(dataToSend, id as string);

            if (result.status === 'OK') {
                setSelectedVehicleBrand('')
                setVehicleModelEngName('')
                setVehicleModelThaiName('')

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขรุ่นเป็น ${result.data.vehicle_model_eng_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/vehicle-model-lists'));
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

    const handleEditVehicleModel = () => {
        Swal.fire({
            title: `แก้ไขรุ่นเป็น ${vehicleModelEngName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editVehicleModel() });
    };

    const getVehicleModel = async () => {
        setIsLoading(true);
        try {
            const result: GetVehicleModelResponse = await getVehicleModelApi(id as string);

            if (result.status === 'OK') {
                setSelectedVehicleBrand(result.data.vehicle_brand_id);
                setVehicleModelEngName(result.data.vehicle_model_eng_name);
                setVehicleModelThaiName(result.data.vehicle_model_thai_name)
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

    useEffect(() => {
        getVehicleModel();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขรุ่นรถ' />
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
                    actionText='แก้ไข'
                    onClick={() => handleEditVehicleModel()}
                />
            </CardPrimary>
        </>
    )
}
