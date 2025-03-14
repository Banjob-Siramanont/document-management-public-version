import Swal from 'sweetalert2';
import { useState } from 'react';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { resetVehicleBrandDatas } from '../../store/reducer/vehicleBrandSlice/VehicleBrandSlice';

// Helper
import { addVehicleBrandApi } from '../../helper/api/vehicleBrand';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { PostVehicleBrandResponse } from '../../types/helper/api/vehicleBrandTypes';
import Loading from '../../components/Loading';

export default function AddVehicleBrand() {

    const {
        vehicleEngName,
        vehicleThaiName
    } = useSelector((state: RootState) => state.vehicleBrandDataStateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addVehicleBrand = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_brand_eng_name: vehicleEngName,
            vehicle_brand_thai_name: vehicleThaiName,
        };
        try {
            const result: PostVehicleBrandResponse = await addVehicleBrandApi(dataToSend);
            if (result.status === 'OK') {
                dispatch(resetVehicleBrandDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่มยี่ห้อรถ ${result.data.vehicle_brand_eng_name}`,
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

    const handleAddVehicleBrand = () => {
        Swal.fire({
            title: `เพิ่มยี่ห้อรถ ${vehicleEngName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addVehicleBrand() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มยี่ห้อรถ' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลยี่ห้อรถ' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/vehicle-brand-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddVehicleBrand()}
                />
            </CardPrimary>
        </>
    )
}
