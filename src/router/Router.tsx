import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { Routes, Route, useLocation } from 'react-router-dom';
// import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
// import Login from '../pages/login/Login';

// Layouts
import SidebarV2 from '../layouts/sidebar/SidebarV2';
import Header from '../layouts/header/Header';

// Claim History
import ClaimHistoryList from '../pages/claimHistory/ClaimHistoryList';
import AddClaimHistory from '../pages/claimHistory/AddClaimHistory';
import EditClaimHistory from '../pages/claimHistory/EditClaimHistory';

// Work Order
import WorkOrderList from '../pages/workOrder/WorkOrderList';
import CreateWorkOrder from '../pages/workOrder/CreateWorkOrder';
import EditWorkOrder from '../pages/workOrder/EditWorkOrder';
import PreviewWorkOrder from '../pages/workOrder/PreviewWorkOrder';
import PrintWorkOrder from '../pages/workOrder/PrintWorkOrder';

// Quotation
import QuotatationLists from '../pages/quotation/QuotatationLists';
import CreateQuotation from '../pages/quotation/CreateQuotation';
import EditQuotation from '../pages/quotation/EditQuotation';
import PreviewQuotation from '../pages/quotation/PreviewQuotation';
import PrintQuotation from '../pages/quotation/PrintQuotation';

// Quotation Cover
import QuotationCoverLists from '../pages/quotationCover/QuotationCoverLists';
import CreateQuotationCover from '../pages/quotationCover/CreateQuotationCover';
import EditQuotationCover from '../pages/quotationCover/EditQuotationCover';
import PrintQuotationCover from '../pages/quotationCover/PrintQuotationCover';

// Pre Invoice
import PreInvoiceList from '../pages/preInvoice/PreInvoiceList';
import CreatePreInvoice from '../pages/preInvoice/CreatePreInvoice';
import EditPreInvoice from '../pages/preInvoice/EditPreInvoice';
import PrintPreInvoice from '../pages/preInvoice/PrintPreInvoice';
import PrintInvoice from '../pages/preInvoice/PrintInvoice';

// Receipt
import ReceiptList from '../pages/receipt/ReceiptList';
import CreateReceipt from '../pages/receipt/CreateReceipt';
import EditReceipt from '../pages/receipt/EditReceipt';
import PrintReceipt from '../pages/receipt/PrintReceipt';

// Insurance Company
import InsuranceCompanyLists from '../pages/insuranceCompany/InsuranceCompanyLists';
import AddInsuranceCompany from '../pages/insuranceCompany/AddInsuranceCompany';
import EditInsuranceCompany from '../pages/insuranceCompany/EditInsuranceCompany';

// Vehicle Brand
import VehicleBrandLists from '../pages/vehicleBrand/VehicleBrandLists';
import AddVehicleBrand from '../pages/vehicleBrand/AddVehicleBrand';
import EditVehicleBrand from '../pages/vehicleBrand/EditVehicleBrand';

// Vehicle Model
import VehicleModelLists from '../pages/vehicleModel/VehicleModelLists';
import AddVehicleModel from '../pages/vehicleModel/AddVehicleModel';
import EditVehicleModel from '../pages/vehicleModel/EditVehicleModel';

// Spare Part
import SparePartList from '../pages/sparePart/SparePartList';
import AddSparePart from '../pages/sparePart/AddSparePart';
import EditSparePart from '../pages/sparePart/EditSparePart';

// Vehicle Color
import VehicleColorLists from '../pages/vehicleColor/VehicleColorLists';
import AddVehicleColor from '../pages/vehicleColor/AddVehicleColor';
import EditVehicleColor from '../pages/vehicleColor/EditVehicleColor';

// Job Position
import JobPositionLists from '../pages/jobPosition/JobPositionLists';
import AddJobPosition from '../pages/jobPosition/AddJobPosition';
import EditJobPosition from '../pages/jobPosition/EditJobPosition';

// Employee
import EmployeeList from '../pages/employee/EmployeeList';
import AddEmployee from '../pages/employee/AddEmployee';
import EditEmployee from '../pages/employee/EditEmployee';

// Company
import AboutCompany from '../pages/company/AboutCompany';
import AddCompanyBranch from '../pages/company/AddCompanyBranch';
import EditCompany from '../pages/company/EditCompany';
import EditCompanyBranch from '../pages/company/EditCompanyBranch';

export default function Router() {
    const location = useLocation();
    const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarDataStateValue);
    const isPrint = location.pathname.includes('/print') || location.pathname === '/login';

    return (
        <div className='relative'>
            {!isPrint && <Header />}
            <div className='grid grid-cols-1 relative'>
                {!isPrint && (
                    <SidebarV2 className={`
                        absolute z-1000 top-0 bottom-0 transition-all duration-500 ease-in-out
                        ${isSidebarOpen ? ' left-0' : '-left-[265px]'}
                    `} />
                )}
                <div className='w-full p-5 min-w-0'>
                    <Routes>
                        {/* <Route path='/login' element={<Login />} />
                        <Route element={<AuthOutlet fallbackPath='/login' />}> */}
                        <Route path='/' element={<ClaimHistoryList />} />

                        {/* Claim History Lists */}
                        <Route path='/claim-history-lists' element={<ClaimHistoryList />} />
                        <Route path='/add-claim-history' element={<AddClaimHistory />} />
                        <Route path='/claim-history-lists/edit' element={<EditClaimHistory />} />

                        {/* Work Order */}
                        <Route path='/work-order-lists' element={<WorkOrderList />} />
                        <Route path='/create-work-order' element={<CreateWorkOrder />} />
                        <Route path='/work-order-lists/edit' element={<EditWorkOrder />} />
                        <Route path='/preview-work-order' element={<PreviewWorkOrder />} />
                        <Route path='/print-work-order' element={<PrintWorkOrder />} />

                        {/* Quotation */}
                        <Route path='/quotation-lists' element={<QuotatationLists />} />
                        <Route path='/create-quotation' element={<CreateQuotation />} />
                        <Route path='/quotation-lists/edit' element={<EditQuotation />} />
                        <Route path='/preview-quotation' element={<PreviewQuotation />} />
                        <Route path='/print-quotation' element={<PrintQuotation />} />

                        {/* Quotation Cover */}
                        <Route path='/quotation-cover-lists' element={<QuotationCoverLists />} />
                        <Route path='/create-quotation-cover' element={<CreateQuotationCover />} />
                        <Route path='/quotation-cover-lists/edit' element={<EditQuotationCover />} />
                        <Route path='/print-quotation-cover' element={<PrintQuotationCover />} />

                        {/* Pre Invoice */}
                        <Route path='/pre-invoice-lists' element={<PreInvoiceList />} />
                        <Route path='/create-pre-invoice' element={<CreatePreInvoice />} />
                        <Route path='/pre-invoice-lists/edit' element={<EditPreInvoice />} />
                        <Route path='/print-pre-invoice' element={<PrintPreInvoice />} />
                        <Route path='/print-invoice' element={<PrintInvoice />} />

                        {/* Receipt */}
                        <Route path='/receipt-lists' element={<ReceiptList />} />
                        <Route path='/create-receipt' element={<CreateReceipt />} />
                        <Route path='/receipt-lists/edit' element={<EditReceipt />} />
                        <Route path='/print-receipt' element={<PrintReceipt />} />

                        {/* Insurance Company */}
                        <Route path='/add-insurance-company' element={<AddInsuranceCompany />} />
                        <Route path='/insurance-company-lists/edit' element={<EditInsuranceCompany />} />
                        <Route path='/insurance-company-lists' element={<InsuranceCompanyLists />} />

                        {/* Vehicle Brand */}
                        <Route path='/vehicle-brand-lists' element={<VehicleBrandLists />} />
                        <Route path='/add-vehicle-brand' element={<AddVehicleBrand />} />
                        <Route path='/vehicle-brand-lists/edit' element={<EditVehicleBrand />} />

                        {/* Vehicle Model */}
                        <Route path='/vehicle-model-lists' element={<VehicleModelLists />} />
                        <Route path='/add-vehicle-model' element={<AddVehicleModel />} />
                        <Route path='/vehicle-model-lists/edit' element={<EditVehicleModel />} />

                        {/* Spare Part */}
                        <Route path='/spare-part-lists' element={<SparePartList />} />
                        <Route path='/add-spare-part' element={<AddSparePart />} />
                        <Route path='/spare-part-lists/edit' element={<EditSparePart />} />

                        {/* Vehicle Color */}
                        <Route path='/vehicle-color-lists' element={<VehicleColorLists />} />
                        <Route path='/add-vehicle-color' element={<AddVehicleColor />} />
                        <Route path='/vehicle-color-lists/edit' element={<EditVehicleColor />} />

                        {/* Job Position */}
                        <Route path='/job-position-lists' element={<JobPositionLists />} />
                        <Route path='/add-job-position' element={<AddJobPosition />} />
                        <Route path='/job-position-lists/edit' element={<EditJobPosition />} />

                        {/* Employee List */}
                        <Route path='/employee-lists' element={<EmployeeList />} />
                        <Route path='/add-employee' element={<AddEmployee />} />
                        <Route path='/employee-lists/edit' element={<EditEmployee />} />

                        {/* Company */}
                        <Route path='/about-company' element={<AboutCompany />} />
                        <Route path='/add-company-branch' element={<AddCompanyBranch />} />
                        <Route path='/edit-company' element={<EditCompany />} />
                        <Route path='/company-branch/edit' element={<EditCompanyBranch />} />
                        {/* </Route> */}
                    </Routes>
                </div>
            </div>
        </div>
    )
}