import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeData, Payload } from '../../../types/store/reducer/employee/employeeSliceTypes';


const setSessionStorage = (state: EmployeeData) => sessionStorage.setItem('employeeDataState', JSON.stringify(state));

const storedState = sessionStorage.getItem('employeeDataState');
const initialState: EmployeeData = storedState ? JSON.parse(storedState) : {
    selectedTitle: '',
    employeeFirstName: '',
    employeeLastName: '',
    employeeNickName: '',
    startWorkingdate: '',
    startPaySocialSecurityDate: '',
};

const employeeDataStateValue = createSlice({
    name: 'employeeDataStateValue',
    initialState: initialState,
    reducers: {
        setEmployeeDatas: <Key extends keyof EmployeeData>(state: EmployeeData, action: PayloadAction<Payload<Key>>) => {
            const { value, variableName } = action.payload;

            state[variableName] = value;
            setSessionStorage(state);
        },
    }
});

export const { setEmployeeDatas } = employeeDataStateValue.actions;
export default employeeDataStateValue.reducer
