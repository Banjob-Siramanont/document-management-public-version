import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addClaimNoAndTotalPrice, deleteClaimNoAndTotalPrice, resetPreInvoiceData } from '../../store/reducer/preInvoiceSlice/PreInvoiceSlice';
import { AppDispatch, RootState } from '../../store/Store';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtonForMultiple from '../components/ActionButtonForMultiple';
import BasicInformation from './components/BasicInformation';
import ClaimNoAndTotalPriceInformation from './components/ClaimNoAndTotalPriceInformation';
import { addMultiplePreInvoiceApi } from '../../helper/api/preInvoice';
import { useState } from 'react';
import Loading from '../../components/Loading';

export default function CreatePreInvoice() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        selectedCompanyBranch,
        claimNoAndTotalPriceDatas,
    } = useSelector((state: RootState) => state.preInvoiceDataStateValue);

    const createPreInvoice = async () => {
        setIsLoading(true);
        const dataToSend = { // เขียนตามที่ chat gpt แนะนำ ก็เลยออกมาหน้าตาไม่เหมือนอันอื่นๆ (backend จะไป map เพื่อเอา value ไปใส่ key ที่ถูกต้องเอง)
            selectedCompanyBranch,
            claimNoAndTotalPriceDatas
        };
        try {
            const result: any = await addMultiplePreInvoiceApi(dataToSend);
            if (result.status === 'OK') {
                dispatch(resetPreInvoiceData());
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/pre-invoice-lists'))
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

    const handleCreatePreInvoice = () => {
        Swal.fire({
            title: `เพิ่มใบแจ้งหนี้`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) createPreInvoice() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='สร้างใบแจ้งหนี้' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลเบื้องต้น' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>

                <TopicOfCard text='ข้อมูลใบแจ้งหนี้' />
                <ThreeColumnGrid>
                    <ClaimNoAndTotalPriceInformation />
                </ThreeColumnGrid>

                <ActionButtonForMultiple
                    actionText='สร้างใบแจ้งหนี้'
                    cancelPath='/pre-invoice-lists'
                    addText='+ เพิ่มใบแจ้งหนี้'
                    deleteText='- ลบใบแจ้งหนี้'
                    addOnClick={() => {
                        dispatch(addClaimNoAndTotalPrice());
                        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 50);
                    }}
                    deleteOnClick={() => dispatch(deleteClaimNoAndTotalPrice())}
                    onClick={() => handleCreatePreInvoice()}
                />
            </CardPrimary>
        </>
    )
}
