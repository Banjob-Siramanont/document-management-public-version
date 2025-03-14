import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { addSparePart, deleteSparePart, resetWorkOrderDatas } from '../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Helper
import { createWorkOrderApi } from '../../helper/api/workOrder';

// Components
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import BasicInformation from './components/BasicInformation';
import ReparingDateInformation from './components/ReparingDateInformation';
import ReparingInformation from './components/ReparingInformation';
import SparePartList from './components/SparePartList';
import ActionButtonForMultiple from '../components/ActionButtonForMultiple';
import Loading from '../../components/Loading';

export default function CreateWorkOrder() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        selectedDriverType,
        selectedClaimHistory,
        vehicleOwnerWorkPlace,
        vehicleOwnerTel,
        vehicleKey,
        reparingBudget,
        afterRepairNote,
        mechanicId,
        parkingDate,
        temporaryTakingVehicleBackDate,
        drivingDate,
        takingDate,
        reparingDate,
        finishReparingDate,
        sparePartDatas
    } = useSelector((state: RootState) => state.createWorkOrderstateValue);

    const createWorkOrder = async () => {
        setIsLoading(true);
        const dataToSend = {
            vehicle_owner_type_id: selectedDriverType,
            claim_history_id: selectedClaimHistory,
            vehicle_owner_work_place: vehicleOwnerWorkPlace,
            vehicle_owner_tel: vehicleOwnerTel,
            key_note: vehicleKey,
            reparing_buget: reparingBudget,
            after_repair_note: afterRepairNote,
            employee_id: mechanicId || null,
            parking_date: parkingDate || null,
            temporary_taking_vehicle_back_date: temporaryTakingVehicleBackDate || null,
            driving_date: drivingDate || null,
            taking_date: takingDate || null,
            reparing_date: reparingDate || null,
            finish_reparing_date: finishReparingDate || null,
            spare_part_datas: sparePartDatas,
        };
        try {
            const result: { data: { _id: string }; client_message: string; status: 'OK' | 'NG' } = await createWorkOrderApi(dataToSend);
            if (result.status === 'OK') {
                dispatch(resetWorkOrderDatas());
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate(`/preview-work-order/?id=${result.data._id}`));
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

    const handleCreateWorkOrder = () => {
        Swal.fire({
            title: 'สร้างใบสั่งงาน',
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'สร้าง',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่สร้าง',
        }).then(result => { if (result.isConfirmed) createWorkOrder() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='สร้างใบสั่งงาน' />
            <CardPrimary>
                <BasicInformation />
                <ReparingDateInformation />
                <ReparingInformation />
                <SparePartList />
                <ActionButtonForMultiple
                    actionText='สร้าง'
                    cancelPath='/work-order-lists'
                    addText='+ เพิ่มอะไหล่'
                    deleteText='- ลบอะไหล่'
                    addOnClick={() => {
                        dispatch(addSparePart());
                        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 50)
                    }}
                    deleteOnClick={() => dispatch(deleteSparePart())}
                    onClick={() => handleCreateWorkOrder()}
                />
            </CardPrimary>
        </>
    )
}
