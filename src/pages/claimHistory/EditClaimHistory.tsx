import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetClaimHistoryDatas, setClaimHistoryDatas } from '../../store/reducer/claimHistorySlice/ClaimHistorySlice';

// Helper
import { editClaimHistoryApi, getClaimHistoryApi } from '../../helper/api/claimHistory';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import WillBeUpdatedInformation from './components/WillBeUpdatedInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { GetClaimHistoryResponse, PostClaimHistoryResponse } from '../../types/helper/api/claimHistoryTypes';
import Loading from '../../components/Loading';

export default function EditClaimHistory() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        claimDate,
        selectedVehicleBrand,
        selectedVehicleModel,
        licensePlate,
        sender,
        selectedInsuranceCompany,
        claimNo,
        exSave,
        remuneration,
        selectedVehicleColor,
        finishReparingDate,
        customerTakingVehicleDate,
        offerReceiptDate,
    } = useSelector((state: RootState) => state.claimHistoryDataStateValue);

    const editClaimHistory = async () => {
        setIsLoading(true);
        const dataToSend = {
            claim_date: claimDate,
            vehicle_brand_id: selectedVehicleBrand,
            vehicle_model_id: selectedVehicleModel,
            license_plate: licensePlate,
            sender: sender,
            insurance_company_id: selectedInsuranceCompany,
            claim_no: claimNo,
            ex_save: exSave,
            remuneration: remuneration,
            vehicle_color_id: selectedVehicleColor || null,
            finish_reparing_date: finishReparingDate || null,
            customer_permanently_take_vehicle_back_date: customerTakingVehicleDate || null,
            receipt_create_date: offerReceiptDate || null,
        }
        try {
            const result: PostClaimHistoryResponse = await editClaimHistoryApi(dataToSend, id as string);
            if (result.status === 'OK') {
                dispatch(resetClaimHistoryDatas());
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/claim-history-lists'));
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

    const handleEditClaimHistory = () => {
        Swal.fire({
            title: 'แก้ไขประวัติรถเข้าเคลม',
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editClaimHistory() });
    };

    const getClaimHistory = async () => {
        setIsLoading(true);
        try {
            const result: GetClaimHistoryResponse = await getClaimHistoryApi(id as string);

            if (result.status === 'OK') {
                dispatch(setClaimHistoryDatas({ value: result.data.claim_date, variableName: 'claimDate' }));
                dispatch(setClaimHistoryDatas({ value: result.data.vehicle_brand_id, variableName: 'selectedVehicleBrand' }));
                dispatch(setClaimHistoryDatas({ value: result.data.vehicle_model_id, variableName: 'selectedVehicleModel' }));
                dispatch(setClaimHistoryDatas({ value: result.data.license_plate, variableName: 'licensePlate' }));
                dispatch(setClaimHistoryDatas({ value: result.data.sender, variableName: 'sender' }));
                dispatch(setClaimHistoryDatas({ value: result.data.insurance_company_id, variableName: 'selectedInsuranceCompany' }));
                dispatch(setClaimHistoryDatas({ value: result.data.claim_no, variableName: 'claimNo' }));
                dispatch(setClaimHistoryDatas({ value: result.data.ex_save, variableName: 'exSave' }));
                dispatch(setClaimHistoryDatas({ value: result.data.remuneration, variableName: 'remuneration' }));
                dispatch(setClaimHistoryDatas({ value: result.data.vehicle_color_id || '', variableName: 'selectedVehicleColor' }));
                dispatch(setClaimHistoryDatas({ value: result.data.finish_reparing_date || '', variableName: 'finishReparingDate' }));
                dispatch(setClaimHistoryDatas({ value: result.data.customer_permanently_take_vehicle_back_date || '', variableName: 'customerTakingVehicleDate' }));
                dispatch(setClaimHistoryDatas({ value: result.data.receipt_create_date || '', variableName: 'offerReceiptDate' }));
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
        getClaimHistory();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขประวัติการเคลม' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลเบื้องต้น' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <TopicOfCard text='ข้อมูลที่ต้องอัพเดท' />
                <ThreeColumnGrid>
                    <WillBeUpdatedInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/claim-history-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditClaimHistory()}
                />
            </CardPrimary>
        </>
    )
}
