import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { addClaimId, deleteClaimId, resetQuotationCoverDatas } from '../../store/reducer/quotationCoverSlice/QuotationCoverSlice';

// Helper
import { createQuotationCoverApi } from '../../helper/api/quotationCover';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import ActionButtonForMultiple from '../components/ActionButtonForMultiple';
import BasicInformation from './components/BasicInformation';
import Loading from '../../components/Loading';

export default function CreateQuotationCover() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { claimIdDatas } = useSelector((state: RootState) => state.quotationCoverStateValueValue);

    const createQuotationCover = async () => {
        setIsLoading(true);
        try {
            const result: any = await createQuotationCoverApi({ claim_id_datas: claimIdDatas });
            if (result.status === 'OK') {
                dispatch(resetQuotationCoverDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/quotation-cover-lists'));
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

    const handleCreateQuotationCover = () => {
        Swal.fire({
            title: 'สร้างใบปะหน้า',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'สร้าง',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่สร้าง',
        }).then(result => { if (result.isConfirmed) createQuotationCover() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='สร้างใบปะหน้า' />
            <CardPrimary>
                <BasicInformation />
                <ActionButtonForMultiple
                    actionText='สร้างใบปะหน้า'
                    cancelPath='/pre-invoice-lists'
                    addText='+ เพิ่ม'
                    deleteText='- ลบ'
                    addOnClick={() => {
                        dispatch(addClaimId());
                        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 50);
                    }}
                    deleteOnClick={() => dispatch(deleteClaimId())}
                    onClick={() => handleCreateQuotationCover()}
                />
            </CardPrimary>
        </>
    )
}
