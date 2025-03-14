import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setQuotationDatas } from '../../../store/reducer/quotationSlice/QuotationSlice';

// Helper
import { getAllCompanyBranchesApi } from '../../../helper/api/companyBranch';
import { getAllClaimHistoryForNoQuotationApi } from '../../../helper/api/claimHistory';

// Component
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';
import TopicOfCard from '../../../common/topic/TopicOfCard';
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';

// Type
import { GetAllCompanyBranchesResponse } from '../../../types/helper/api/companyBranchTypes';
import { GetClaimHistoryForNoQuotationResponse } from '../../../types/helper/api/claimHistoryTypes';

export default function BasicInformation({ isEditMode = false }: { isEditMode?: boolean }) {
    const {
        companyBranchOptionDatas,
        claimHistoryOptionDatas,
        selectedCompanyBranch,
        selectedClaimHistory,
        vehicleName,
    } = useSelector((state: RootState) => state.quotationStateValueValue);

    const dispatch = useDispatch<AppDispatch>();

    const getAllCompanyBranches = async () => {
        try {
            const result: GetAllCompanyBranchesResponse = await getAllCompanyBranchesApi();
            if (result.status === 'OK') {
                dispatch(setQuotationDatas({ value: result.data, variableName: 'companyBranchOptionDatas' }));
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllClaimHistoryForNoQuotation = async () => {
        try {
            const result: GetClaimHistoryForNoQuotationResponse = await getAllClaimHistoryForNoQuotationApi();

            if (result.status === 'OK') {
                dispatch(setQuotationDatas({ value: result.data, variableName: 'claimHistoryOptionDatas' }));
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCompanyBranches();
        if (!isEditMode) getAllClaimHistoryForNoQuotation();
    }, []);

    return (
        <>
            <TopicOfCard text='ข้อมูลเบื้องต้น' />
            <ThreeColumnGrid>
                <SelectPrimary
                    labelTag='สาขา'
                    optionDatas={companyBranchOptionDatas}
                    selectedValue={selectedCompanyBranch}
                    keyValue='_id'
                    keyDisplayValue='company_branch_name'
                    onChange={value => dispatch(setQuotationDatas({ value, variableName: 'selectedCompanyBranch' }))}
                />
                <InputPrimary
                    labelTag='ชื่อรถจักรยานยนต์'
                    placeholder='กรุณาระบุ'
                    type='text'
                    value={vehicleName}
                    onChange={event => dispatch(setQuotationDatas({ value: event.target.value, variableName: 'vehicleName' }))}
                />
                {!isEditMode && (
                    <>
                        <SelectPrimary
                            labelTag='เลขทะเบียน'
                            optionDatas={claimHistoryOptionDatas}
                            selectedValue={selectedClaimHistory}
                            keyValue='_id'
                            keyDisplayValue='license_plate'
                            onChange={value => dispatch(setQuotationDatas({ value, variableName: 'selectedClaimHistory' }))}
                        />
                        <SelectPrimary
                            labelTag='เลขที่เคลม'
                            optionDatas={claimHistoryOptionDatas}
                            selectedValue={selectedClaimHistory}
                            keyValue='_id'
                            keyDisplayValue='claim_no'
                            onChange={value => dispatch(setQuotationDatas({ value, variableName: 'selectedClaimHistory' }))}
                        />
                    </>
                )}
            </ThreeColumnGrid>
        </>
    )
}
