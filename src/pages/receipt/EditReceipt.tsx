import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { resetReceipt, setReceiptDatas } from '../../store/reducer/receipt/ReceiptSlice';

// Helper
import { editReceiptApi, getReceiptApi } from '../../helper/api/receipt';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { GetReceiptForEditResponse, PostReceiptResponse } from '../../types/helper/api/receiptTypes';
import Loading from '../../components/Loading';

export default function CreateReceipt() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

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

    const editReceipt = async () => {
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
            const result: PostReceiptResponse = await editReceiptApi(dataToSend, id as string);

            if (result.status === 'OK') {
                dispatch(resetReceipt());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขใบเสร็จเลขที่ ${result.data.receipt_no}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/receipt-lists'));
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

    const handleEditReceipt = () => {
        Swal.fire({
            title: `แก้ไขใบเสร็จเลขที่ ${receiptNo}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editReceipt() });
    };

    const getReceipt = async () => {
        setIsLoading(true);
        try {
            const result: GetReceiptForEditResponse = await getReceiptApi(id as string);
            if (result.status === 'OK') {
                dispatch(setReceiptDatas({ value: result.data.company_branch, variableName: 'selectedCompanyBranch' }));
                dispatch(setReceiptDatas({ value: result.data.receipt_no, variableName: 'receiptNo' }));
                dispatch(setReceiptDatas({ value: result.data.insurance_company, variableName: 'insuranceCompany' }));
                dispatch(setReceiptDatas({ value: result.data.receipt_detail, variableName: 'detail' }));
                dispatch(setReceiptDatas({ value: result.data.receipt_sub_detail, variableName: 'subDetail' }));
                dispatch(setReceiptDatas({ value: result.data.receipt_total_price, variableName: 'totalPrice' }));
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
        getReceipt();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขใบเสร็จรับเงิน' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลที่ต้องระบุ' />
                <BasicInformation />
                <ActionButtons
                    actionText='แก้ไขใบเสร็จรับเงิน'
                    cancelPath='/receipt-lists'
                    onClick={() => handleEditReceipt()}
                />
            </CardPrimary>
        </>
    )
}
