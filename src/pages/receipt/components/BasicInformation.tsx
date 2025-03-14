import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { autoSetReceiptNo, setReceiptDatas } from '../../../store/reducer/receipt/ReceiptSlice';

// Helper
import { isValidateReceiptNo } from '../../../helper/utils/validateValue';
import { getAllCompanyBranchesApi } from '../../../helper/api/companyBranch';
import { getAllInsuranceCompanyApi } from '../../../helper/api/insuranceCompany';

// Component
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';

// Type
import { GetAllCompanyBranchesResponse, GetCompanyBranchData } from '../../../types/helper/api/companyBranchTypes';
import { GetAllInsuranceCompanyResponse, GetInsuranceCompanyData } from '../../../types/helper/api/insuranceCompanyTypes';

export default function BasicInformation() {
    const {
        selectedCompanyBranch,
        receiptNo,
        insuranceCompany,
        detail,
        subDetail,
        totalPrice,
    } = useSelector((state: RootState) => state.receiptDataStateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [insuranceCompanyDatas, setInsuranceCompanyDatas] = useState<GetInsuranceCompanyData[]>([]);
    const [companyBranchDatas, setCompanyBranchdatas] = useState<GetCompanyBranchData[]>([]);

    const getAllInsuranceCompany = async () => {
        try {
            const result: GetAllInsuranceCompanyResponse = await getAllInsuranceCompanyApi();
            if (result.status === 'OK') return setInsuranceCompanyDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllCompanyBranches = async () => {
        try {
            const result: GetAllCompanyBranchesResponse = await getAllCompanyBranchesApi();
            if (result.status === 'OK') return setCompanyBranchdatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllInsuranceCompany();
        getAllCompanyBranches();
        if (receiptNo === '') dispatch(autoSetReceiptNo());
    }, []);

    return (
        <ThreeColumnGrid>
            <SelectPrimary
                labelTag='สาขา'
                optionDatas={companyBranchDatas}
                selectedValue={selectedCompanyBranch}
                keyValue='_id'
                keyDisplayValue='company_branch_name'
                onChange={value => dispatch(setReceiptDatas({ value, variableName: 'selectedCompanyBranch' }))}
            />
            <InputPrimary
                labelTag='บิลเลขที่'
                placeholder='IVปปดดxxx'
                type='text'
                value={receiptNo}
                maxLength={9}
                onChange={event => dispatch(setReceiptDatas({ value: event.target.value, variableName: 'receiptNo' }))}
                textHelper={(receiptNo.length === 9 && !isValidateReceiptNo(receiptNo)) ? 'กรุณาตรวจสอบความถูกต้องของเลขบิล' : ''}
            />
            <SelectPrimary
                labelTag='ลูกค้า'
                optionDatas={insuranceCompanyDatas}
                selectedValue={insuranceCompany}
                keyValue='_id'
                keyDisplayValue='insurance_company_name'
                onChange={value => dispatch(setReceiptDatas({ value, variableName: 'insuranceCompany' }))}
            />
            <InputPrimary
                labelTag='รายละเอียด'
                placeholder='กรุณาระบุ'
                type='text'
                value={detail}
                onChange={event => dispatch(setReceiptDatas({ value: event.target.value, variableName: 'detail' }))}
            />
            <InputPrimary
                labelTag='รายละเอียดเพิ่มเติม'
                placeholder='ไม่บังคับ (กรอกกรณีที่ลูกค้าไม่ใช่กรุงเทพประกันภัย)'
                type='text'
                value={subDetail}
                onChange={event => dispatch(setReceiptDatas({ value: event.target.value, variableName: 'subDetail' }))}
            />
            <InputPrimary
                labelTag='จำนวนเงินรวมทั้งสิ้น'
                placeholder='กรุณาระบุ'
                type='number'
                value={totalPrice}
                onChange={event => dispatch(setReceiptDatas({ value: event.target.value, variableName: 'totalPrice' }))}
            />
        </ThreeColumnGrid>
    )
}
