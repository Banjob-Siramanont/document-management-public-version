import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload, ReceiptData } from '../../../types/store/reducer/receipt/receiptSliceType';

const setSessionStorage = (state: ReceiptData) => sessionStorage.setItem('receiptDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('receiptDataState');
const initialState: ReceiptData = storedState ? JSON.parse(storedState) : {
    selectedCompanyBranch: '',
    receiptNo: '',
    insuranceCompany: '',
    detail: 'ค่าซ่อมรถตามเอกสารแนบใบกำกับภาษี',
    subDetail: '',
    totalPrice: 0,
};

const receiptDataStateValue = createSlice({
    name: 'receiptDataStateValue',
    initialState: initialState,
    reducers: {
        setReceiptDatas: <Key extends keyof ReceiptData>(state: ReceiptData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        autoSetReceiptNo: (state: ReceiptData) => {
            const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of year (2025 -> "25")
            const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0'); // Get 2-digit month (1 -> "01", 12 -> "12")

            state.receiptNo = `IV${currentYear}${currentMonth}`;

            setSessionStorage(state);
        },
        resetReceipt: (state: ReceiptData) => {
            state.selectedCompanyBranch = '';
            state.receiptNo = '';
            state.insuranceCompany = '';
            state.detail = 'ค่าซ่อมรถตามเอกสารแนบใบกำกับภาษี';
            state.subDetail = '';
            state.totalPrice = 0;
            setSessionStorage(state);
        },
    }
});

export const { setReceiptDatas, autoSetReceiptNo, resetReceipt } = receiptDataStateValue.actions;
export default receiptDataStateValue.reducer
