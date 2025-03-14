import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setCreateWorkOrderDatas } from '../../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Component
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import SelectPrimary from '../../../common/select/SelectPrimary';
import TopicOfCard from '../../../common/topic/TopicOfCard';
import InputPrimary from '../../../common/input/InputPrimary';

// Type
import { getAllVehicleOwnerTypesApi } from '../../../helper/api/vehicleOwnerTypes';
import { GetAllVehicleOwnerTypeData, GetAllVehicleOwnerTypeDatasResponse } from '../../../types/helper/api/vehicleOwnerTypes';
import { getAllClaimHistoryForNoWorkOrderApi } from '../../../helper/api/claimHistory';
import { ClaimHistoryForNoWorkOrderData, GetClaimHistoryForNoWorkOrderResponse } from '../../../types/helper/api/claimHistoryTypes';

export default function BasicInformation({ isEditMode = false }: { isEditMode?: boolean }) {

    const {
        selectedDriverType,
        selectedClaimHistory,
        vehicleKey,
        afterRepairNote,
        vehicleOwnerWorkPlace,
        vehicleOwnerTel,
        reparingBudget,
    } = useSelector((state: RootState) => state.createWorkOrderstateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [vehicleOwnerTypeDatas, setVehicleOwnerTypeDatas] = useState<GetAllVehicleOwnerTypeData[]>([]);
    const [claimHistoryDatas, setClaimHistoryDatas] = useState<ClaimHistoryForNoWorkOrderData[]>([]);

    const getAllVehicleOwnerTypes = async () => {
        try {
            const result: GetAllVehicleOwnerTypeDatasResponse = await getAllVehicleOwnerTypesApi();
            if (result.status === 'OK') return setVehicleOwnerTypeDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllClaimHistoryForNoWorkOrder = async () => {
        try {
            const result: GetClaimHistoryForNoWorkOrderResponse = await getAllClaimHistoryForNoWorkOrderApi();
            if (result.status === 'OK') return setClaimHistoryDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllVehicleOwnerTypes();
        getAllClaimHistoryForNoWorkOrder();
    }, []);

    return (
        <>
            <TopicOfCard text='ข้อมูลเบื้องต้น' />
            <ThreeColumnGrid>
                <SelectPrimary
                    labelTag='ประเภทเจ้าของรถ'
                    optionDatas={vehicleOwnerTypeDatas}
                    selectedValue={selectedDriverType}
                    keyValue='_id'
                    keyDisplayValue='vehicle_owner_type_name'
                    onChange={value => dispatch(setCreateWorkOrderDatas({ value: value as string, variableName: 'selectedDriverType' }))}
                />
                <InputPrimary
                    labelTag='บริษัทที่เจ้าของรถทำงาน'
                    placeholder='LINE MAN / CP-ALL / Lotus / 7-11 etc.'
                    type='text'
                    value={vehicleOwnerWorkPlace}
                    onChange={event => dispatch(setCreateWorkOrderDatas({ value: event.target.value, variableName: 'vehicleOwnerWorkPlace' }))}
                />
                <InputPrimary
                    labelTag='เบอร์ติดต่อเจ้าของรถ'
                    placeholder='099123456'
                    type='text'
                    maxLength={10}
                    value={vehicleOwnerTel}
                    onChange={event => dispatch(setCreateWorkOrderDatas({ value: event.target.value, variableName: 'vehicleOwnerTel' }))}
                />
                {!isEditMode && (
                    <SelectPrimary
                        labelTag='เลขเคลม'
                        optionDatas={claimHistoryDatas}
                        selectedValue={selectedClaimHistory}
                        keyValue='_id'
                        keyDisplayValue='claim_no'
                        onChange={value => dispatch(setCreateWorkOrderDatas({ value: value as string, variableName: 'selectedClaimHistory' }))}
                    />
                )}
                <InputPrimary
                    labelTag='ทุนประกัน'
                    placeholder='กรุณาระบุ'
                    type='number'
                    value={reparingBudget}
                    onChange={event => dispatch(setCreateWorkOrderDatas({ value: event.target.value, variableName: 'reparingBudget' }))}
                />
                <InputPrimary
                    labelTag='กุญแจ'
                    placeholder='กรุณาระบุ'
                    type='text'
                    value={vehicleKey}
                    onChange={event => dispatch(setCreateWorkOrderDatas({ value: event.target.value, variableName: 'vehicleKey' }))}
                />
                <InputPrimary
                    labelTag='หมายเหตุหลังซ่อมเสร็จ'
                    placeholder='ไม่บังคับ'
                    type='text'
                    value={afterRepairNote}
                    onChange={event => dispatch(setCreateWorkOrderDatas({ value: event.target.value, variableName: 'afterRepairNote' }))}
                />
            </ThreeColumnGrid>
        </>
    )
}
