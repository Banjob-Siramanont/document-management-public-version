import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateWorkOrderData, Payload, SparePartData } from '../../../types/store/reducer/workOrder/createWorkOrderSliceTypes';

const setSessionStorage = (state: CreateWorkOrderData) => sessionStorage.setItem('createWorkOrderstate', JSON.stringify(state));

const storedState = sessionStorage.getItem('createWorkOrderstate');
const initialState: CreateWorkOrderData = storedState ? JSON.parse(storedState) : {
    selectedClaimHistory: '',
    vehicleKey: '',
    afterRepairNote: '',
    vehicleOwnerWorkPlace: '',
    vehicleOwnerTel: '',
    reparingBudget: 0,
    selectedDriverType: '',
    parkingDate: '',
    temporaryTakingVehicleBackDate: '',
    drivingDate: '',
    takingDate: '',
    mechanicId: '',
    reparingDate: '',
    finishReparingDate: '',
    sparePartDatas: [
        {
            id: 1,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 2,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 3,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 4,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 5,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 6,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 7,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 8,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 9,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 10,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 11,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 12,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 13,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 14,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        },
        {
            id: 15,
            spare_part_id: '',
            spare_part_actions: [],
            note: '',
        }
    ],
};

const createWorkOrderstateValue = createSlice({
    name: 'createWorkOrderstateValue',
    initialState: initialState,
    reducers: {
        setCreateWorkOrderDatas: <Key extends keyof CreateWorkOrderData>(state: CreateWorkOrderData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            switch (variableName) {
                case 'parkingDate': {
                    state[variableName] = value;
                    state.temporaryTakingVehicleBackDate = '';
                    state.drivingDate = '';
                    state.takingDate = '';
                    break;
                }
                case 'temporaryTakingVehicleBackDate': {
                    state[variableName] = value;
                    state.parkingDate = '';
                    state.drivingDate = '';
                    state.takingDate = '';
                    break;
                }
                case 'drivingDate': {
                    state[variableName] = value;
                    state.parkingDate = '';
                    state.temporaryTakingVehicleBackDate = '';
                    state.takingDate = '';
                    break;
                }
                case 'takingDate': {
                    state[variableName] = value;
                    state.parkingDate = '';
                    state.temporaryTakingVehicleBackDate = '';
                    state.drivingDate = '';
                    break;
                }
                default: state[variableName] = value; break;
            }
            setSessionStorage(state);
        },
        addSparePart: (state: CreateWorkOrderData) => {
            const newSparePart = {
                id: state.sparePartDatas.length + 1,
                spare_part_id: '',
                spare_part_actions: [],
                note: '',
            }
            // @ts-ignore
            state.sparePartDatas.push(newSparePart);
            setSessionStorage(state);
        },
        deleteSparePart: (state: CreateWorkOrderData) => {
            if (state.sparePartDatas.length === 1) return
            state.sparePartDatas.pop();
            setSessionStorage(state);
        },
        setSparePartDatas: (
            state: CreateWorkOrderData,
            action: PayloadAction<{ index: number; updateKey: keyof SparePartData; value: number | string | string[] }>
        ) => {
            const { index, updateKey, value } = action.payload;
            switch (updateKey) {
                case 'spare_part_id': {
                    state.sparePartDatas[index].spare_part_id = value as string;
                    break;
                }
                case 'spare_part_actions': {
                    state.sparePartDatas[index].spare_part_actions = value as string[];
                    break;
                }
                case 'note': {
                    state.sparePartDatas[index].note = value as string;
                    break;
                }
            }
            setSessionStorage(state);
        },
        resetWorkOrderDatas: (state: CreateWorkOrderData) => {
            state.selectedClaimHistory = '';
            state.vehicleKey = '';
            state.afterRepairNote = '';
            state.vehicleOwnerWorkPlace = '';
            state.vehicleOwnerTel = '';
            state.reparingBudget = 0;
            state.selectedDriverType = '';
            state.parkingDate = '';
            state.temporaryTakingVehicleBackDate = '';
            state.drivingDate = '';
            state.takingDate = '';
            state.mechanicId = '';
            state.reparingDate = '';
            state.finishReparingDate = '';
            state.sparePartDatas = [
                {
                    id: 1,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 2,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 3,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 4,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 5,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 6,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 7,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 8,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 9,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 10,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 11,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 12,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 13,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 14,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                },
                {
                    id: 15,
                    spare_part_id: '',
                    spare_part_actions: [],
                    note: '',
                }
            ]
            setSessionStorage(state);
        },
    }
});

export const { setCreateWorkOrderDatas, addSparePart, deleteSparePart, setSparePartDatas, resetWorkOrderDatas } = createWorkOrderstateValue.actions;
export default createWorkOrderstateValue.reducer
