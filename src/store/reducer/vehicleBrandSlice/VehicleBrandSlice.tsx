import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload, VehicleBrandData } from '../../../types/store/reducer/vehicleBrand/vehicleBrandSliceTypes';


const setSessionStorage = (state: VehicleBrandData) => sessionStorage.setItem('vehicleBrandDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('vehicleBrandDataState');
const initialState: VehicleBrandData = storedState ? JSON.parse(storedState) : {
    vehicleEngName: '',
    vehicleThaiName: '',
};

const vehicleBrandDataStateValue = createSlice({
    name: 'vehicleBrandDataStateValue',
    initialState: initialState,
    reducers: {
        setVehicleBrandDatas: <Key extends keyof VehicleBrandData>(state: VehicleBrandData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        resetVehicleBrandDatas: (state: VehicleBrandData) => {
            state.vehicleEngName = '';
            state.vehicleThaiName = '';

            setSessionStorage(state);
        },
    }
});

export const { setVehicleBrandDatas, resetVehicleBrandDatas } = vehicleBrandDataStateValue.actions;
export default vehicleBrandDataStateValue.reducer
