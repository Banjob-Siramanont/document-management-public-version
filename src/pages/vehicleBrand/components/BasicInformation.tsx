import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setVehicleBrandDatas } from '../../../store/reducer/vehicleBrandSlice/VehicleBrandSlice';

// Component
import InputPrimary from '../../../common/input/InputPrimary';

export default function BasicInformation() {
    const {
        vehicleEngName,
        vehicleThaiName
    } = useSelector((state: RootState) => state.vehicleBrandDataStateValue);

    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <InputPrimary
                labelTag='ชื่อยี่ห้อ (ภาษาอังกฤษ)'
                placeholder='Honda'
                type='text'
                value={vehicleEngName}
                onChange={event => dispatch(setVehicleBrandDatas({ value: event.target.value, variableName: 'vehicleEngName' }))}
            />
            <InputPrimary
                labelTag='ชื่อยี่ห้อ (ภาษาไทย)'
                placeholder='ฮอนด้า'
                type='text'
                value={vehicleThaiName}
                onChange={event => dispatch(setVehicleBrandDatas({ value: event.target.value, variableName: 'vehicleThaiName' }))}
            />
        </>
    )
}
