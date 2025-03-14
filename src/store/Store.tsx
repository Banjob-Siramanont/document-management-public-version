import { configureStore } from '@reduxjs/toolkit';
import createWorkOrderstateValue from './reducer/workOrderSlice/CreateWorkOrderSlice';
import claimHistoryDataStateValue from './reducer/claimHistorySlice/ClaimHistorySlice';
import insuranceCompanyDataStateValue from './reducer/insuranceCompanySlice/InsuranceCompanySlice';
import employeeDataStateValue from './reducer/employeeSlice/EmployeeSlice';
import companyDataStateValue from './reducer/companySlice/CompanySlice';
import preInvoiceDataStateValue from './reducer/preInvoiceSlice/PreInvoiceSlice';
import receiptDataStateValue from './reducer/receipt/ReceiptSlice';
import quotationStateValueValue from './reducer/quotationSlice/QuotationSlice';
import vehicleBrandDataStateValue from './reducer/vehicleBrandSlice/VehicleBrandSlice';
import sidebarDataStateValue from './reducer/sidebarSlice/SidebarSlice';
import quotationCoverStateValueValue from './reducer/quotationCoverSlice/QuotationCoverSlice';

export const store = configureStore({
    reducer: {
        createWorkOrderstateValue,
        claimHistoryDataStateValue,
        insuranceCompanyDataStateValue,
        employeeDataStateValue,
        companyDataStateValue,
        preInvoiceDataStateValue,
        receiptDataStateValue,
        quotationStateValueValue,
        vehicleBrandDataStateValue,
        sidebarDataStateValue,
        quotationCoverStateValueValue
    },
});

// Define RootState dynamically
export type RootState = ReturnType<typeof store.getState>; // type for state in useSelector
export type AppDispatch = typeof store.dispatch; // type for useDispatch
