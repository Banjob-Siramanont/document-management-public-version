import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setClaimHistoryDatas } from '../../../store/reducer/claimHistorySlice/ClaimHistorySlice';

// Helper
import { getAllVehicleColorsApi } from '../../../helper/api/vehicleColor';

// Component
import InputDateAndTime from '../../../common/input/InputDateAndTime';
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';

// Type
import { GetAllVehicleColorResponse, GetVehicleColorData } from '../../../types/helper/api/vehicleColorTypes';

export default function WillBeUpdatedInformation() {

    const {
        remuneration,
        selectedVehicleColor,
        finishReparingDate,
        customerTakingVehicleDate,
        offerReceiptDate,
    } = useSelector((state: RootState) => state.claimHistoryDataStateValue);

    const [vehicleColorDatas, setVehicleColorDatas] = useState<GetVehicleColorData[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const getAllVehicleColors = async () => {
        try {
            const result: GetAllVehicleColorResponse = await getAllVehicleColorsApi();

            if (result.status === 'OK') return setVehicleColorDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllVehicleColors()
    }, []);

    return (
        <>
            <InputPrimary
                labelTag='Note'
                placeholder='กรุณาระบุ'
                type='number'
                value={remuneration}
                onChange={event => dispatch(setClaimHistoryDatas({ value: event.target.value, variableName: 'remuneration' }))}
            />
            <SelectPrimary
                labelTag='สีรถ'
                optionDatas={vehicleColorDatas}
                selectedValue={selectedVehicleColor}
                keyValue='_id'
                keyDisplayValue='vehicle_color_name'
                onChange={value => dispatch(setClaimHistoryDatas({ value, variableName: 'selectedVehicleColor' }))}
            />
            <InputDateAndTime
                type='date'
                labelTag='วันที่รถซ่อมเสร็จ'
                placeholder='กรุณาเลือกวันที่'
                value={finishReparingDate}
                onChange={formattedDate => dispatch(setClaimHistoryDatas({ value: formattedDate, variableName: 'finishReparingDate' }))}
            />
            <InputDateAndTime
                type='date'
                labelTag='วันที่ลูกค้ารับรถ'
                placeholder='กรุณาเลือกวันที่'
                value={customerTakingVehicleDate}
                onChange={formattedDate => dispatch(setClaimHistoryDatas({ value: formattedDate, variableName: 'customerTakingVehicleDate' }))}
            />
            <InputDateAndTime
                type='date'
                labelTag='วันที่ออกใบเสร็จ / ใบกำกับภาษี'
                placeholder='กรุณาเลือกวันที่'
                value={offerReceiptDate}
                onChange={formattedDate => dispatch(setClaimHistoryDatas({ value: formattedDate, variableName: 'offerReceiptDate' }))}
            />
        </>
    )
}
