import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setPreInvoiceDatas } from '../../../store/reducer/preInvoiceSlice/PreInvoiceSlice';

// Helper
import { getAllCompanyBranchesApi } from '../../../helper/api/companyBranch';

// Company
import SelectPrimary from '../../../common/select/SelectPrimary'

// Type
import { GetAllCompanyBranchesResponse, GetCompanyBranchData } from '../../../types/helper/api/companyBranchTypes';

export default function BasicInformation() {

    const { selectedCompanyBranch } = useSelector((state: RootState) => state.preInvoiceDataStateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [companyBranchDatas, setCompanyBranchdatas] = useState<GetCompanyBranchData[]>([]);

    const getAllCompanyBranches = async () => {
        try {
            const result: GetAllCompanyBranchesResponse = await getAllCompanyBranchesApi();
            if (result.status === 'OK') {
                setCompanyBranchdatas(result.data)
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCompanyBranches();
    }, []);

    return (
        <>
            <SelectPrimary
                labelTag='สาขา'
                optionDatas={companyBranchDatas}
                selectedValue={selectedCompanyBranch}
                keyValue='_id'
                keyDisplayValue='company_branch_name'
                onChange={value => dispatch(setPreInvoiceDatas({ value: value as string, variableName: 'selectedCompanyBranch' }))}
            />
        </>
    )
}
