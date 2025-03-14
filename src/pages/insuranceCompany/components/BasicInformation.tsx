import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setInsuranceCompanyDatas } from '../../../store/reducer/insuranceCompanySlice/InsuranceCompanySlice';

// Helper
import { numericWithoutText, thaiTextOnly } from '../../../helper/utils/validateValue';

// Component
import InputPrimary from '../../../common/input/InputPrimary';
import InputDateAndTime from '../../../common/input/InputDateAndTime';

export default function BasicInformation() {
    const {
        insuranceCompanyName,
        insuranceCompanyShortName,
        insuranceCompanyAddress,
        insuranceCompanyTaxId,
        insuranceCompanyAllianceDate,
    } = useSelector((state: RootState) => state.insuranceCompanyDataStateValue);

    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <InputPrimary
                labelTag='ชื่อบริษัท'
                placeholder='กรุณาระบุ'
                type='text'
                value={insuranceCompanyName}
                onChange={event => dispatch(setInsuranceCompanyDatas({ value: event.target.value, variableName: 'insuranceCompanyName' }))}
            />
            <InputPrimary
                labelTag='ชื่อย่อบริษัท'
                placeholder='เช่น กรุงเทพประกันภัย, ฟอลคอน, สยามซิตี้ ฯลฯ'
                type='text'
                value={insuranceCompanyShortName}
                onChange={event => dispatch(setInsuranceCompanyDatas({ value: thaiTextOnly(event.target.value), variableName: 'insuranceCompanyShortName' }))}
            />
            <InputPrimary
                labelTag='ที่อยู่'
                placeholder='กรุณาระบุ'
                type='text'
                value={insuranceCompanyAddress}
                onChange={event => dispatch(setInsuranceCompanyDatas({ value: event.target.value, variableName: 'insuranceCompanyAddress' }))}
            />
            <InputPrimary
                labelTag='เลขประจำตัวผู้เสียภาษี'
                placeholder='กรุณาระบุ'
                type='text'
                value={insuranceCompanyTaxId}
                onChange={event => dispatch(setInsuranceCompanyDatas({ value: numericWithoutText(event.target.value), variableName: 'insuranceCompanyTaxId' }))}
            />
            <InputDateAndTime
                type='date'
                labelTag='วันที่เป็นอู่ในเครือ'
                placeholder='กรุณาเลือกวันที่'
                value={insuranceCompanyAllianceDate}
                onChange={formattedDate => dispatch(setInsuranceCompanyDatas({ value: formattedDate, variableName: 'insuranceCompanyAllianceDate' }))}
            />
        </>
    )
}
