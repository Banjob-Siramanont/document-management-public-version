import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetPreInvoiceData, setClaimNoAndTotalPriceDatas, setPreInvoiceDatas } from '../../store/reducer/preInvoiceSlice/PreInvoiceSlice';

// Helper
import { editPreInvoiceApi, getPreInvoiceApi } from '../../helper/api/preInvoice';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import ClaimNoAndTotalPriceInformation from './components/ClaimNoAndTotalPriceInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { GetPreInvoiceDataResponse, PostPreInvoiceResponse } from '../../types/helper/api/preInvoiceType';
import Loading from '../../components/Loading';

export default function EditPreInvoice() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        selectedCompanyBranch,
        claimNoAndTotalPriceDatas,
    } = useSelector((state: RootState) => state.preInvoiceDataStateValue);

    const editPreInvoice = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch_id: selectedCompanyBranch,
            claim_history_id: claimNoAndTotalPriceDatas[0].claimNo,
            pre_invoice_total_price: claimNoAndTotalPriceDatas[0].totalPrice
        };

        try {
            const result: PostPreInvoiceResponse = await editPreInvoiceApi(dataToSend, id as string);
            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/pre-invoice-lists'));
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

    const handleEditPreInvoice = () => {
        Swal.fire({
            title: `แก้ไขใบวางบิล`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editPreInvoice() });
    };

    const getPreInvoice = async () => {
        setIsLoading(true);
        try {
            const result: GetPreInvoiceDataResponse = await getPreInvoiceApi(id as string);

            if (result.status === 'OK') {
                dispatch(setPreInvoiceDatas({ value: result.data.company_branch_id as string, variableName: 'selectedCompanyBranch' }));
                dispatch(setClaimNoAndTotalPriceDatas({ index: 0, updateKey: 'claimNo', value: result.data.claim_history_id }));
                dispatch(setClaimNoAndTotalPriceDatas({ index: 0, updateKey: 'totalPrice', value: result.data.pre_invoice_total_price }));
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
        // เพื่อจะได้มั่นใจว่าเมื่อเข้ามาที่หน้าแก้ไขแล้วจะมีข้อมูลแสดงเพียง 1 อัน (ตัดปัญหาว่าข้อมูลมีมากกว่า 1 อันจากการเข้าไปที่หน้า add แล้วไม่กดสร้างใบวางบิล)
        dispatch(resetPreInvoiceData());
    }, []);

    useEffect(() => {
        // ทำงานต่อจาก useEffect ด้านบน
        if (selectedCompanyBranch === '') getPreInvoice();
    }, [selectedCompanyBranch]);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขใบแจ้งหนี้' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลเบื้องต้น' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>

                <TopicOfCard text='ข้อมูลใบแจ้งหนี้' />
                <ThreeColumnGrid>
                    <ClaimNoAndTotalPriceInformation isEditMode={true} />
                </ThreeColumnGrid>

                <ActionButtons
                    actionText='แก้ไขใบแจ้งหนี้'
                    cancelPath='/pre-invoice-lists'
                    onClick={() => handleEditPreInvoice()}
                />
            </CardPrimary>
        </>
    )
}
