import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payload, QuotationCoverData } from '../../../types/store/reducer/quotationCover/quotationCoverSliceTypes';

const setSessionStorage = (state: QuotationCoverData) => sessionStorage.setItem('quotationCoverStateValue', JSON.stringify(state));

const storedState = sessionStorage.getItem('quotationCoverStateValue');
const initialState: QuotationCoverData = storedState ? JSON.parse(storedState) : {
    claimIdDatas: [
        {
            id: 1,
            claim_history_id: '',
        },
        {
            id: 2,
            claim_history_id: '',
        },
        {
            id: 3,
            claim_history_id: '',
        },
        {
            id: 4,
            claim_history_id: '',
        },
        {
            id: 5,
            claim_history_id: '',
        },
        {
            id: 6,
            claim_history_id: '',
        },
    ],
};

const quotationCoverStateValueValue = createSlice({
    name: 'quotationCoverStateValueValue',
    initialState: initialState,
    reducers: {
        setQuotationCoverDatas: <Key extends keyof QuotationCoverData>(state: QuotationCoverData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
        addClaimId: (state: QuotationCoverData) => {
            const newClaimId = {
                id: state.claimIdDatas.length + 1,
                claim_history_id: '',
            }
            state.claimIdDatas.push(newClaimId);
            setSessionStorage(state);
        },
        deleteClaimId: (state: QuotationCoverData) => {
            if (state.claimIdDatas.length === 1) return
            state.claimIdDatas.pop();
            setSessionStorage(state);
        },
        setClaimIdDatas: (
            state: QuotationCoverData,
            action: PayloadAction<{ index: number; value: string }>
        ) => {
            const { index, value } = action.payload;
            state.claimIdDatas[index].claim_history_id = value;
            setSessionStorage(state);
        },
        resetQuotationCoverDatas: (state: QuotationCoverData) => {
            state.claimIdDatas = [
                {
                    id: 1,
                    claim_history_id: '',
                },
                {
                    id: 2,
                    claim_history_id: '',
                },
                {
                    id: 3,
                    claim_history_id: '',
                },
                {
                    id: 4,
                    claim_history_id: '',
                },
                {
                    id: 5,
                    claim_history_id: '',
                },
                {
                    id: 6,
                    claim_history_id: '',
                },
            ],
                setSessionStorage(state);
        },
    }
});

export const {
    setQuotationCoverDatas,
    addClaimId,
    deleteClaimId,
    setClaimIdDatas,
    resetQuotationCoverDatas,
} = quotationCoverStateValueValue.actions;
export default quotationCoverStateValueValue.reducer
