import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetQuotationDatas, setQuotationDatas } from '../../store/reducer/quotationSlice/QuotationSlice';

// Helper
import { editQuotationApi, getQuotationForEditApi } from '../../helper/api/quotation';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import BasicInformation from './components/BasicInformation';
import WageInformation from './components/WageInformation';
import ReplacingSparePartInformation from './components/ReplacingSparePartInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { GetQuotationForEditResponse } from '../../types/helper/api/quotationTypes';
import Loading from '../../components/Loading';

export default function EditQuotation() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        selectedCompanyBranch,
        selectedClaimHistory,
        vehicleName,
        wageDatas,
        replacingSparePartDatas,
    } = useSelector((state: RootState) => state.quotationStateValueValue);

    const editQuotation = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch_id: selectedCompanyBranch,
            claim_history_id: selectedClaimHistory,
            vehicle_name: vehicleName,
            wage_datas: wageDatas,
            replacing_spare_part_datas: replacingSparePartDatas,
        };
        try {
            const result: GetQuotationForEditResponse = await editQuotationApi(dataToSend, id as string);

            if (result.status === 'OK') {
                dispatch(resetQuotationDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate(`/preview-quotation/?id=${result.data._id}`));
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

    const handleEditQuotation = () => {
        Swal.fire({
            title: `แก้ไขใบเสนอราคา`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editQuotation() });
    };

    const getQuotation = async () => {
        setIsLoading(true)
        try {
            const result: GetQuotationForEditResponse = await getQuotationForEditApi(id as string);

            if (result.status === 'OK') {
                dispatch(setQuotationDatas({ value: result.data.company_branch_id, variableName: 'selectedCompanyBranch' }));
                dispatch(setQuotationDatas({ value: result.data.claim_history_id, variableName: 'selectedClaimHistory' }));
                dispatch(setQuotationDatas({ value: result.data.vehicle_name, variableName: 'vehicleName' }));
                dispatch(setQuotationDatas({ value: result.data.replacing_spare_part_datas, variableName: 'replacingSparePartDatas' }));
                dispatch(setQuotationDatas({ value: result.data.wage_datas, variableName: 'wageDatas' }));
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getQuotation();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขใบเสนอราคา' />
            <CardPrimary>
                <BasicInformation isEditMode={true} />
                <WageInformation />
                <ReplacingSparePartInformation />
                <ActionButtons
                    cancelPath='/quotation-lists'
                    actionText='แก้ไขใบเสนอราคา'
                    onClick={() => handleEditQuotation()}
                />
            </CardPrimary>
        </>
    )
}