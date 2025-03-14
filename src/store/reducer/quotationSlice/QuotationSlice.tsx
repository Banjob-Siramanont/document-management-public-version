import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload, QuotationData, ReplacingSparePartData, WageData } from '../../../types/store/reducer/quotation/quotationSliceTypes';

const setSessionStorage = (state: QuotationData) => sessionStorage.setItem('quotationStateValue', JSON.stringify(state));

const storedState = sessionStorage.getItem('quotationStateValue');
const initialState: QuotationData = storedState ? JSON.parse(storedState) : {
    companyBranchOptionDatas: [],
    claimHistoryOptionDatas: [],
    sparePartOptionDatas: [],
    selectedCompanyBranch: '',
    selectedClaimHistory: '',
    vehicleName: '',
    replacingSparePartDatas: [
        {
            id: 1,
            spare_part_id: '',
            price: 0,
        },
    ],
    wageDatas: [
        {
            id: 1,
            wage: 'ดัดโช๊คหน้า',
            price: 0,
        },
        {
            id: 2,
            wage: 'ดัดแผงคอ',
            price: 0,
        },
        {
            id: 3,
            wage: 'ค่าแรงถอดประกอบ',
            price: 0,
        },
    ],
    totalReplacingSparePartPrice: 0,
    totalWagePrice: 0,
    totalReplaceAndWagePrice: 0,
};

const quotationStateValueValue = createSlice({
    name: 'quotationStateValueValue',
    initialState: initialState,
    reducers: {
        setQuotationDatas: <Key extends keyof QuotationData>(state: QuotationData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        addReplacingSparePart: (state: QuotationData) => {
            const newSparePart = {
                id: state.replacingSparePartDatas.length + 1,
                spare_part_id: '',
                price: 0,
            }
            state.replacingSparePartDatas.push(newSparePart);
            setSessionStorage(state);
        },
        deleteReplacingSparePart: (state: QuotationData) => {
            if (state.replacingSparePartDatas.length === 1) return
            state.replacingSparePartDatas.pop();
            setSessionStorage(state);
        },
        setReplacingSparePartDatas: (
            state: QuotationData,
            action: PayloadAction<{ index: number; updateKey: keyof ReplacingSparePartData; value: number | string }>
        ) => {
            const { index, updateKey, value } = action.payload;
            switch (updateKey) {
                case 'spare_part_id': {
                    state.replacingSparePartDatas[index].spare_part_id = value as string;
                    break;
                }
                case 'price': {
                    state.replacingSparePartDatas[index].price = value as number;
                    break;
                }
            }
            setSessionStorage(state);
        },
        addWage: (state: QuotationData) => {
            const newWage = {
                id: state.wageDatas.length + 1,
                wage: '',
                price: 0,
            }
            state.wageDatas.push(newWage);
            setSessionStorage(state);
        },
        deleteWage: (state: QuotationData) => {
            if (state.wageDatas.length === 1) return
            state.wageDatas.pop();
            setSessionStorage(state);
        },
        setWageDatas: (
            state: QuotationData,
            action: PayloadAction<{ index: number; updateKey: keyof WageData; value: number | string }>
        ) => {
            const { index, updateKey, value } = action.payload;
            switch (updateKey) {
                case 'wage': {
                    state.wageDatas[index].wage = value as string;
                    break;
                }
                case 'price': {
                    state.wageDatas[index].price = value as number;
                    break;
                }
            }
            setSessionStorage(state);
        },
        resetQuotationDatas: (state: QuotationData) => {
            state.selectedCompanyBranch = '';
            state.selectedClaimHistory = '';
            state.vehicleName = '';
            state.replacingSparePartDatas = [
                {
                    id: 1,
                    spare_part_id: '',
                    price: 0,
                },
            ];
            state.wageDatas = [
                {
                    id: 1,
                    wage: 'ดัดโช๊คหน้า',
                    price: 0,
                },
                {
                    id: 2,
                    wage: 'ดัดแผงคอ',
                    price: 0,
                },
                {
                    id: 3,
                    wage: 'ค่าแรงถอดประกอบ',
                    price: 0,
                },
            ];
            setSessionStorage(state);
        },
    }
});

export const {
    setQuotationDatas,
    addReplacingSparePart,
    deleteReplacingSparePart,
    setReplacingSparePartDatas,
    addWage,
    deleteWage,
    setWageDatas,
    resetQuotationDatas,
} = quotationStateValueValue.actions;
export default quotationStateValueValue.reducer
