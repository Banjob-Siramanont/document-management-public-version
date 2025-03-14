import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClaimNoAndTotalPriceData, Payload, PreInvoiceData } from '../../../types/store/reducer/preInvoice/preInvoiceSliceTypes';

const setSessionStorage = (state: PreInvoiceData) => sessionStorage.setItem('preInvoiceDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('preInvoiceDataState');
const initialState: PreInvoiceData = storedState ? JSON.parse(storedState) : {
    selectedCompanyBranch: '',
    claimNoAndTotalPriceDatas: [
        {
            id: 1,
            claimNo: '',
            totalPrice: 0,
        }
    ],
};

const preInvoiceDataStateValue = createSlice({
    name: 'preInvoiceDataStateValue',
    initialState: initialState,
    reducers: {
        setPreInvoiceDatas: <Key extends keyof PreInvoiceData>(state: PreInvoiceData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        addClaimNoAndTotalPrice: (state: PreInvoiceData) => {
            const newClaimNoAndTotalPrice = {
                id: state.claimNoAndTotalPriceDatas.length + 1,
                claimNo: '',
                totalPrice: 0,
            }
            state.claimNoAndTotalPriceDatas.push(newClaimNoAndTotalPrice);
            setSessionStorage(state);
        },
        deleteClaimNoAndTotalPrice: (state: PreInvoiceData) => {
            if (state.claimNoAndTotalPriceDatas.length === 1) return
            state.claimNoAndTotalPriceDatas.pop();
            setSessionStorage(state);
        },
        setClaimNoAndTotalPriceDatas: (
            state: PreInvoiceData,
            action: PayloadAction<{ index: number; updateKey: keyof ClaimNoAndTotalPriceData; value: string | number }>
        ) => {
            const { index, updateKey, value } = action.payload;
            switch (updateKey) {
                case 'claimNo': {
                    state.claimNoAndTotalPriceDatas[index].claimNo = value as string;
                    break;
                }
                case 'totalPrice': {
                    state.claimNoAndTotalPriceDatas[index].totalPrice = value as number;
                    break;
                }
            }
            setSessionStorage(state);
        },
        resetPreInvoiceData: (state: PreInvoiceData) => {
            state.selectedCompanyBranch = '';
            state.claimNoAndTotalPriceDatas = [
                {
                    id: 1,
                    claimNo: '',
                    totalPrice: 0,
                }
            ];
            setSessionStorage(state);
        },
    }
});

export const {
    setPreInvoiceDatas,
    addClaimNoAndTotalPrice,
    deleteClaimNoAndTotalPrice,
    setClaimNoAndTotalPriceDatas,
    resetPreInvoiceData,
} = preInvoiceDataStateValue.actions;
export default preInvoiceDataStateValue.reducer
