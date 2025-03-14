import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { resetVehicleBrandDatas, setVehicleBrandDatas } from '../../store/reducer/vehicleBrandSlice/VehicleBrandSlice';

// Helper
import { editVehicleBrandApi, getVehicleBrandApi } from '../../helper/api/vehicleBrand';
import { GetVehicleBrandResponse, PostVehicleBrandResponse } from '../../types/helper/api/vehicleBrandTypes';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';
import Loading from '../../components/Loading';

export default function EditVehicleBrand() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        vehicleEngName,
        vehicleThaiName
    } = useSelector((state: RootState) => state.vehicleBrandDataStateValue);

    const editVehicleBrand = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_brand_eng_name: vehicleEngName,
            vehicle_brand_thai_name: vehicleThaiName,
        };
        try {
            const result: PostVehicleBrandResponse = await editVehicleBrandApi(dataToSend, id as string);

            if (result.status === 'OK') {
                dispatch(resetVehicleBrandDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขยี่ห้อรถเป็น ${result.data.vehicle_brand_eng_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/vehicle-brand-lists'));
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

    const handleEditVehicleBrand = () => {
        Swal.fire({
            title: `แก้ไขยี่ห้อรถเป็น ${vehicleEngName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editVehicleBrand() });
    };

    const getVehicleBrand = async () => {
        setIsLoading(true);
        try {
            const result: GetVehicleBrandResponse = await getVehicleBrandApi(id as string);

            if (result.status === 'OK') {
                dispatch(setVehicleBrandDatas({ value: result.data.vehicle_brand_eng_name, variableName: 'vehicleEngName' }));
                dispatch(setVehicleBrandDatas({ value: result.data.vehicle_brand_thai_name, variableName: 'vehicleThaiName' }));
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getVehicleBrand();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขยี่ห้อ' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลยี่ห้อ' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/vehicle-brand-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditVehicleBrand()}
                />
            </CardPrimary>
        </>
    )
}
