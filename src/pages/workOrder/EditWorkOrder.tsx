import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { addSparePart, deleteSparePart, resetWorkOrderDatas, setCreateWorkOrderDatas } from '../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Helper
import { editWorkOrderApi, getWorkOrderForEditApi } from '../../helper/api/workOrder';

// Company
import Topic from '../../common/topic/Topic';
import BasicInformation from './components/BasicInformation';
import CardPrimary from '../../common/card/CardPrimary';
import ReparingDateInformation from './components/ReparingDateInformation';
import ReparingInformation from './components/ReparingInformation';
import SparePartList from './components/SparePartList';
import ActionButtonForMultiple from '../components/ActionButtonForMultiple';

// Type
import { GetWorkOrderForEditResponse } from '../../types/helper/api/workOrderTypes';
import Loading from '../../components/Loading';

export default function EditWorkOrder() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id')

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

    const editWorkOrder = async () => {
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
            const result: { data: { _id: string }; client_message: string; status: 'OK' | 'NG' } = await editWorkOrderApi(dataToSend, id as string);
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

    const handleEditWorkOrder = () => {
        Swal.fire({
            title: 'แก้ไขใบสั่งงาน',
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'บันทึก',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่บันทึก',
        }).then(result => { if (result.isConfirmed) editWorkOrder() });
    };

    const getWorkOrderForEdit = async () => {
        setIsLoading(true);
        try {
            const result: GetWorkOrderForEditResponse = await getWorkOrderForEditApi(id as string);
            if (result.status === 'OK') {
                dispatch(setCreateWorkOrderDatas({ value: result.data.vehicle_owner_type_id, variableName: 'selectedDriverType' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.vehicle_owner_work_place, variableName: 'vehicleOwnerWorkPlace' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.vehicle_owner_tel, variableName: 'vehicleOwnerTel' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.claim_history_id, variableName: 'selectedClaimHistory' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.reparing_buget, variableName: 'reparingBudget' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.key_note, variableName: 'vehicleKey' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.after_repair_note, variableName: 'afterRepairNote' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.employee_id, variableName: 'mechanicId' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.reparing_date, variableName: 'reparingDate' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.finish_reparing_date, variableName: 'finishReparingDate' }));
                dispatch(setCreateWorkOrderDatas({ value: result.data.spare_part_datas, variableName: 'sparePartDatas' }));
                if (result.data.parking_date !== '') dispatch(setCreateWorkOrderDatas({ value: result.data.parking_date, variableName: 'parkingDate' }));
                if (result.data.temporary_taking_vehicle_back_date !== '') dispatch(setCreateWorkOrderDatas({ value: result.data.temporary_taking_vehicle_back_date, variableName: 'temporaryTakingVehicleBackDate' }));
                if (result.data.driving_date !== '') dispatch(setCreateWorkOrderDatas({ value: result.data.driving_date, variableName: 'drivingDate' }));
                if (result.data.taking_date !== '') dispatch(setCreateWorkOrderDatas({ value: result.data.taking_date, variableName: 'takingDate' }));
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
        getWorkOrderForEdit();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขใบสั่งงาน' />
            <CardPrimary>
                <BasicInformation isEditMode={true} />
                <ReparingDateInformation />
                <ReparingInformation />
                <SparePartList />
                <ActionButtonForMultiple
                    actionText='บันทึก'
                    cancelPath='/work-order-lists'
                    addText='+ เพิ่มอะไหล่'
                    deleteText='- ลบอะไหล่'
                    addOnClick={() => {
                        dispatch(addSparePart());
                        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 50)
                    }}
                    deleteOnClick={() => dispatch(deleteSparePart())}
                    onClick={() => handleEditWorkOrder()}
                />
            </CardPrimary>
        </>
    )
}
