import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClaimHistoryData, Payload } from '../../../types/store/reducer/claimHistory/claimHistorySliceTypes';

const setSessionStorage = (state: ClaimHistoryData) => sessionStorage.setItem('claimHistoryDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('claimHistoryDataState');
const initialState: ClaimHistoryData = storedState ? JSON.parse(storedState) : {
    claimDate: '',
    selectedVehicleBrand: '',
    selectedVehicleModel: '',
    licensePlate: '',
    sender: '',
    selectedInsuranceCompany: '',
    claimNo: '',
    exSave: 0,
    remuneration: 0,
    selectedVehicleColor: '',
    finishReparingDate: '',
    customerTakingVehicleDate: '',
    offerReceiptDate: '',
};

const claimHistoryDataStateValue = createSlice({
    name: 'claimHistoryDataStateValue',
    initialState: initialState,
    reducers: {
        setClaimHistoryDatas: <Key extends keyof ClaimHistoryData>(state: ClaimHistoryData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        resetClaimHistoryDatas: (state: ClaimHistoryData) => {
            state.claimDate = '';
            state.selectedVehicleBrand = '';
            state.selectedVehicleModel = '';
            state.licensePlate = '';
            state.sender = '';
            state.selectedInsuranceCompany = '';
            state.claimNo = '';
            state.exSave = 0;
            state.remuneration = 0;
            state.selectedVehicleColor = '';
            state.finishReparingDate = '';
            state.customerTakingVehicleDate = '';
            state.offerReceiptDate = '';
            setSessionStorage(state);
        },
    }
});

export const { setClaimHistoryDatas, resetClaimHistoryDatas } = claimHistoryDataStateValue.actions;
export default claimHistoryDataStateValue.reducer
