import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setClaimHistoryDatas } from '../../../store/reducer/claimHistorySlice/ClaimHistorySlice';

// Helper
import { getAllVehicleBrandsApi } from '../../../helper/api/vehicleBrand';
import { getAllInsuranceCompanyApi } from '../../../helper/api/insuranceCompany';
import { getVehicleModelFromVehicleBrandApi } from '../../../helper/api/vehicleModel';
import { numericWithoutText } from '../../../helper/utils/validateValue';

// Component
import InputDateAndTime from '../../../common/input/InputDateAndTime';
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';
import SelectSearch from '../../../common/select/SelectSearch';

// Type
import { GetAllVehicleBrandsResponse, GetVehicleBrandData } from '../../../types/helper/api/vehicleBrandTypes';
import { GetAllVehicleModelResponse, GetVehicleModelData } from '../../../types/helper/api/vehicleModelTypes';
import { GetAllInsuranceCompanyResponse, GetInsuranceCompanyData } from '../../../types/helper/api/insuranceCompanyTypes';

export default function BasicInformation() {

    const {
        claimDate,
        selectedVehicleBrand,
        selectedVehicleModel,
        licensePlate,
        sender,
        selectedInsuranceCompany,
        claimNo,
        exSave,
    } = useSelector((state: RootState) => state.claimHistoryDataStateValue);

    const [vehicleBrandDatas, setVehicleBrandDatas] = useState<GetVehicleBrandData[]>([]);
    const [vehicleModelDatas, setVehicleModelDatas] = useState<GetVehicleModelData[]>([]);
    const [insuranceCompanyDatas, setInsuranceCompanyDatas] = useState<GetInsuranceCompanyData[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const getAllVehicleBrands = async () => {
        try {
            const result: GetAllVehicleBrandsResponse = await getAllVehicleBrandsApi();
            if (result.status === 'OK') return setVehicleBrandDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getVehicleModelFromVehicleBrand = async (vehicle_brand_id: string) => {
        try {
            const result: GetAllVehicleModelResponse = await getVehicleModelFromVehicleBrandApi(vehicle_brand_id);

            if (result.status === 'OK') return setVehicleModelDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error)
        }
    };

    const handleSelectVehicleBrand = (vehicle_brand_id: string) => {
        if (vehicle_brand_id === selectedVehicleBrand) return
        getVehicleModelFromVehicleBrand(vehicle_brand_id);
        dispatch(setClaimHistoryDatas({ value: '', variableName: 'selectedVehicleModel' }));
        dispatch(setClaimHistoryDatas({ value: vehicle_brand_id, variableName: 'selectedVehicleBrand' }));
    };

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

    useEffect(() => {
        getAllVehicleBrands();
        getAllInsuranceCompany();
    }, []);

    useEffect(() => {
        if (vehicleModelDatas.length > 0 || selectedVehicleBrand === '') return
        getVehicleModelFromVehicleBrand(selectedVehicleBrand);
    }, [selectedVehicleBrand])

    return (
        <>
            <InputDateAndTime
                type='date'
                labelTag='วันที่เข้าเคลม'
                placeholder='กรุณาเลือกวันที่'
                value={claimDate}
                onChange={formattedDate => dispatch(setClaimHistoryDatas({ value: formattedDate, variableName: 'claimDate' }))}
            />
            <SelectPrimary
                labelTag='ยี่ห้อรถ'
                optionDatas={vehicleBrandDatas}
                selectedValue={selectedVehicleBrand}
                keyValue='_id'
                keyDisplayValue='vehicle_brand_eng_name'
                onChange={value => handleSelectVehicleBrand(value as string)}
            />
            <SelectSearch
                labelTag='รุ่นรถ'
                optionDatas={vehicleModelDatas}
                selectedValue={selectedVehicleModel}
                keyValue='_id'
                keyDisplayValue='vehicle_model_eng_name'
                onChange={value => dispatch(setClaimHistoryDatas({ value, variableName: 'selectedVehicleModel' }))}
            />

            <InputPrimary
                labelTag='เลขทะเบียน'
                placeholder='กรุณาระบุ'
                type='text'
                value={licensePlate}
                onChange={event => dispatch(setClaimHistoryDatas({ value: event.target.value, variableName: 'licensePlate' }))}
            />
            <InputPrimary
                labelTag='ผู้ทำเคลม'
                placeholder='กรุณาระบุ'
                type='text'
                value={sender}
                onChange={event => dispatch(setClaimHistoryDatas({ value: event.target.value, variableName: 'sender' }))}
            />
            <SelectPrimary
                labelTag='บริษัทประกัน'
                optionDatas={insuranceCompanyDatas}
                selectedValue={selectedInsuranceCompany}
                keyValue='_id'
                keyDisplayValue='insurance_company_short_name'
                onChange={value => dispatch(setClaimHistoryDatas({ value, variableName: 'selectedInsuranceCompany' }))}
            />
            <InputPrimary
                labelTag='เลขที่เคลม'
                placeholder='กรุณาระบุ'
                type='text'
                maxLength={30}
                value={claimNo}
                onChange={event => dispatch(setClaimHistoryDatas({ value: event.target.value, variableName: 'claimNo' }))}
            />
            <InputPrimary
                labelTag='EX-SAVE'
                placeholder='กรุณาระบุ'
                type='number'
                value={exSave}
                onChange={event => dispatch(setClaimHistoryDatas({ value: numericWithoutText(event.target.value), variableName: 'exSave' }))}
            />
        </>
    )
}
