import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { useNavigate } from 'react-router-dom';
import { addClaimId, deleteClaimId, resetQuotationCoverDatas, setQuotationCoverDatas } from '../../store/reducer/quotationCoverSlice/QuotationCoverSlice';

// Helper
import { editQuotationCoverApi, getQuotationCoverApi } from '../../helper/api/quotationCover';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import Loading from '../../components/Loading';
import BasicInformation from './components/BasicInformation';
import ActionButtonForMultiple from '../components/ActionButtonForMultiple';

// Type
import { ClaimIdData } from '../../types/store/reducer/quotationCover/quotationCoverSliceTypes';

export default function EditQuotationCover() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { claimIdDatas } = useSelector((state: RootState) => state.quotationCoverStateValueValue);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const editQuotationCover = async () => {
        setIsLoading(true);
        try {
            const result: { status: 'OK' | 'NG'; client_message: string; data: ClaimIdData } = await editQuotationCoverApi({ claim_id_datas: claimIdDatas }, id as string);

            if (result.status === 'OK') {
                dispatch(resetQuotationCoverDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate(`/print-quotation-cover/?id=${id}`));
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

    const handleEditQuotationCover = () => {
        Swal.fire({
            title: `แก้ไขใบปะหน้า`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editQuotationCover() });
    };

    const getQuotationCover = async () => {
        try {
            const result: any = await getQuotationCoverApi(id as string);
            console.log(result)
            if (result.status === 'OK') {
                dispatch(setQuotationCoverDatas({ value: result.data, variableName: 'claimIdDatas' }))
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuotationCover();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขใบปะหน้า' />
            <CardPrimary>
                <BasicInformation />

                <ActionButtonForMultiple
                    actionText='แก้ไขใบปะหน้า'
                    cancelPath='/pre-invoice-lists'
                    addText='+ เพิ่ม'
                    deleteText='- ลบ'
                    addOnClick={() => {
                        dispatch(addClaimId());
                        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 50);
                    }}
                    deleteOnClick={() => dispatch(deleteClaimId())}
                    onClick={() => handleEditQuotationCover()}
                />
            </CardPrimary>
        </>
    )
}
