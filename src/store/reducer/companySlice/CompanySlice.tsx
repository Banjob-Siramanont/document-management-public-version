import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyBranchData, CompanyData, Payload } from '../../../types/store/reducer/company/companySliceTypes';

const setSessionStorage = (state: CompanyData) => sessionStorage.setItem('companyDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('companyDataState');
const initialState: CompanyData = storedState ? JSON.parse(storedState) : {
    companyName: '',
    companyTaxId: '',
    companyTel: '',
    companyEmail: '',
    companyBranchs: [
        {
            id: 1,
            companyBranchName: '',
            companyBranchAddress: '',
        }
    ]
};

const companyDataStateValue = createSlice({
    name: 'companyDataStateValue',
    initialState: initialState,
    reducers: {
        setCompanyDatas: <Key extends keyof CompanyData>(state: CompanyData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        addCompanyBranch: (state: CompanyData) => {
            const newBranch = {
                id: state.companyBranchs.length + 1,
                companyBranchName: '',
                companyBranchAddress: '',
            }
            state.companyBranchs.push(newBranch);
            setSessionStorage(state);
        },
        deleteCompanyBranch: (state: CompanyData) => {
            if (state.companyBranchs.length === 1) return
            state.companyBranchs.pop();
            setSessionStorage(state);
        },
        setCompanyBranchDatas: (
            state: CompanyData,
            action: PayloadAction<{ index: number; updateKey: keyof CompanyBranchData; value: string }>
        ) => {
            const { index, updateKey, value } = action.payload;
            switch (updateKey) {
                case 'companyBranchName': {
                    state.companyBranchs[index].companyBranchName = value;
                    break;
                }
                case 'companyBranchAddress': {
                    state.companyBranchs[index].companyBranchAddress = value;
                    break;
                }
            }
            setSessionStorage(state);
        },
    }
});

export const { setCompanyDatas, addCompanyBranch, deleteCompanyBranch, setCompanyBranchDatas } = companyDataStateValue.actions;
export default companyDataStateValue.reducer
