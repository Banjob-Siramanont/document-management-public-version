import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetClaimHistoryDatas } from '../../store/reducer/claimHistorySlice/ClaimHistorySlice';

// Helper
import { addClaimHistoryApi } from '../../helper/api/claimHistory';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { PostClaimHistoryResponse } from '../../types/helper/api/claimHistoryTypes';
import { useState } from 'react';
import Loading from '../../components/Loading';

export default function AddClaimHistory() {

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
    } = useSelector((state: RootState) => state.claimHistoryDataStateValue);

    const addClaimHistory = async () => {
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
        };

        try {
            const result: PostClaimHistoryResponse = await addClaimHistoryApi(dataToSend);
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

    const handleAddClaimHistory = () => {
        Swal.fire({
            title: 'เพิ่มประวัติรถเข้าเคลม',
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addClaimHistory() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มประวัติรถเข้าเคลม' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลเบื้องต้น' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/claim-history-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddClaimHistory()}
                />
            </CardPrimary>
        </>
    )
}
