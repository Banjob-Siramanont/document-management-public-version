import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addSparePartApi } from '../../helper/api/sparePart';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { PostSparePartResponse } from '../../types/helper/api/sparePartTypes';
import Loading from '../../components/Loading';

export default function AddSparePart() {

    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<string>('');
    const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>('');
    const [sparePartName, setSparePartName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addSparePart = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_model: selectedVehicleModel,
            spare_part_name: sparePartName,
        };
        try {
            const result: PostSparePartResponse = await addSparePartApi(dataToSend);
            if (result.status === 'OK') {
                setSparePartName('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่ม ${result.data.spare_part_name}`,
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

    const handleAddSparePart = () => {
        Swal.fire({
            title: `เพิ่ม ${sparePartName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addSparePart() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มอะไหล่' />
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
                    actionText='เพิ่ม'
                    onClick={() => handleAddSparePart()}
                />
            </CardPrimary>
        </>
    )
}
