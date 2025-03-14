import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { editSparePartApi, getSparePartApi } from '../../helper/api/sparePart';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { GetSparePartResponse, PostSparePartResponse } from '../../types/helper/api/sparePartTypes';
import Loading from '../../components/Loading';

export default function EditSparePart() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<string>('');
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>('');
    const [sparePartName, setSparePartName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editSparePart = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_model: selectedVehicleModel,
            spare_part_name: sparePartName,
        };

        try {
            const result: PostSparePartResponse = await editSparePartApi(dataToSend, id as string);
            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขอะไหล่เป็น ${result.data.spare_part_name} `,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/spare-part-lists'));
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

    const handleEditSparePart = () => {
        Swal.fire({
            title: `แก้ไขอะไหล่เป็น ${sparePartName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editSparePart() });
    };

    const getSparePart = async () => {
        setIsLoading(true);
        try {
            const result: GetSparePartResponse = await getSparePartApi(id as string);

            if (result.status === 'OK') {
                setSelectedVehicleBrand(result.data.vehicle_brand_id);
                setSelectedVehicleModel(result.data.vehicle_model_id);
                setSparePartName(result.data.spare_part_name);
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
        getSparePart()
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขอะไหล่' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลอะไหล่' />

                <BasicInformation
                    selectedVehicleBrand={selectedVehicleBrand}
                    setSelectedVehicleBrand={_id => setSelectedVehicleBrand(_id)}
                    selectedVehicleModel={selectedVehicleModel}
                    setSelectedVehicleModel={_id => setSelectedVehicleModel(_id)}
                    sparePartName={sparePartName}
                    setSparePartName={value => setSparePartName(value)}
                />

                <ActionButtons
                    cancelPath='/spare-part-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditSparePart()}
                />
            </CardPrimary>
        </>
    )
}
