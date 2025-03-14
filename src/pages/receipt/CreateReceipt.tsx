import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetReceipt } from '../../store/reducer/receipt/ReceiptSlice';

// Helper
import { createReceiptApi } from '../../helper/api/receipt';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { PostReceiptResponse } from '../../types/helper/api/receiptTypes';
import { useState } from 'react';
import Loading from '../../components/Loading';

export default function CreateReceipt() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        selectedCompanyBranch,
        receiptNo,
        insuranceCompany,
        detail,
        subDetail,
        totalPrice,
    } = useSelector((state: RootState) => state.receiptDataStateValue);

    const createReceipt = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch: selectedCompanyBranch,
            receipt_no: receiptNo,
            insurance_company: insuranceCompany,
            receipt_detail: detail,
            receipt_sub_detail: subDetail,
            receipt_total_price: totalPrice,
        };
        try {
            const result: PostReceiptResponse = await createReceiptApi(dataToSend);
            if (result.status === 'OK') {
                dispatch(resetReceipt());
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `สร้างใบเสร็จรับเงินเลขที่ ${result.data.receipt_no}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate(`/print-receipt/?id=${result.data._id}`));
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

    const handleCreateReceipt = () => {
        Swal.fire({
            title: `สร้างใบเสร็จรับเงินเลขที่ ${receiptNo}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) createReceipt() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='สร้างใบเสร็จรับเงิน' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลที่ต้องระบุ' />
                <BasicInformation />
                <ActionButtons
                    actionText='สร้างใบเสร็จรับเงิน'
                    cancelPath='/receipt-lists'
                    onClick={() => handleCreateReceipt()}
                />
            </CardPrimary>
        </>
    )
}
