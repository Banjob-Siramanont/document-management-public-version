import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InsuranceCompanyData, Payload } from '../../../types/store/reducer/insuranceCompany/insuranceCompanySliceTypes';

const setSessionStorage = (state: InsuranceCompanyData) => sessionStorage.setItem('insuranceCompanyDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('insuranceCompanyDataState');
const initialState: InsuranceCompanyData = storedState ? JSON.parse(storedState) : {
    insuranceCompanyName: '',
    insuranceCompanyShortName: '',
    insuranceCompanyAddress: '',
    insuranceCompanyTaxId: '',
    insuranceCompanyAllianceDate: '',
};

const insuranceCompanyDataStateValue = createSlice({
    name: 'insuranceCompanyDataStateValue',
    initialState: initialState,
    reducers: {
        setInsuranceCompanyDatas: <Key extends keyof InsuranceCompanyData>(state: InsuranceCompanyData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        resetInsuranceCompanyDatas: (state: InsuranceCompanyData) => {
            state.insuranceCompanyName = '';
            state.insuranceCompanyShortName = '';
            state.insuranceCompanyAddress = '';
            state.insuranceCompanyTaxId = '';
            state.insuranceCompanyAllianceDate = '';

            setSessionStorage(state);
        },
    }
});

export const { setInsuranceCompanyDatas, resetInsuranceCompanyDatas } = insuranceCompanyDataStateValue.actions;
export default insuranceCompanyDataStateValue.reducer
