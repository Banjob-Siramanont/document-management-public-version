import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetQuotationDatas } from '../../store/reducer/quotationSlice/QuotationSlice';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { createQuotationApi } from '../../helper/api/quotation';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import BasicInformation from './components/BasicInformation';
import WageInformation from './components/WageInformation';
import ReplacingSparePartInformation from './components/ReplacingSparePartInformation';
import ActionButtons from '../components/ActionButtons';
import Loading from '../../components/Loading';

export default function CreateQuotation() {

    const navigate = useNavigate();

    const {
        claimHistoryOptionDatas,
        selectedCompanyBranch,
        selectedClaimHistory,
        vehicleName,
        wageDatas,
        replacingSparePartDatas,
    } = useSelector((state: RootState) => state.quotationStateValueValue);

    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createQuotation = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch_id: selectedCompanyBranch,
            claim_history_id: selectedClaimHistory,
            vehicle_name: vehicleName,
            wage_datas: wageDatas,
            replacing_spare_part_datas: replacingSparePartDatas,
        };
        try {
            const result: { data: { _id: string }; client_message: string; status: 'OK' | 'NG' } = await createQuotationApi(dataToSend);
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

    const handleCreateQuotation = () => {
        Swal.fire({
            title: `สร้างใบเสนอราคา`,
            text: `เลขทะเบียน ${filteredData(claimHistoryOptionDatas, selectedClaimHistory, '_id', 'license_plate')}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'สร้าง',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่สร้าง',
        }).then(result => { if (result.isConfirmed) createQuotation() });
    };

    // useEffect(() => {
    //     if (selectedClaimHistory === '') return
    //     dispatch(setQuotationDatas({value: '', variableName:'replacingSparePartDatas'}));
    // }, [selectedClaimHistory]);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text={`สร้างใบเสนอราคา ${filteredData(claimHistoryOptionDatas, selectedClaimHistory, '_id', 'vehicle_brand_name')} ${filteredData(claimHistoryOptionDatas, selectedClaimHistory, '_id', 'vehicle_model_name')}`} />
            <CardPrimary>
                <BasicInformation />
                <WageInformation />
                <ReplacingSparePartInformation />
                <ActionButtons
                    cancelPath='/quotation-lists'
                    actionText='สร้าง'
                    onClick={() => handleCreateQuotation()}
                />
            </CardPrimary>
        </>
    )
}