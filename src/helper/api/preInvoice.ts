import axios from 'axios';
import { ClaimNoAndTotalPriceData } from '../../types/store/reducer/preInvoice/preInvoiceSliceTypes';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllPreInvoicesApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/pre-invoices`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    selectedCompanyBranch: string;
    claimNoAndTotalPriceDatas: ClaimNoAndTotalPriceData[];
};
export const addMultiplePreInvoiceApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/pre-invoices/multiple`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
    catch (error: any) {
        console.log(error);
        Swal.fire({
            title: 'ดำเนินการไม่สำเร็จ',
            text: `${error.response.data}`,
            icon: 'error',
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'OK'
        })
    }
};

export const getPreInvoiceApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/pre-invoices/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type EditData = {
    company_branch_id: string;
    claim_history_id: string;
    pre_invoice_total_price: number;
}
export const editPreInvoiceApi = async (data: EditData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/pre-invoices/${_id}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
    catch (error: any) {
        console.log(error);
        Swal.fire({
            title: 'ดำเนินการไม่สำเร็จ',
            text: `${error.response.data}`,
            icon: 'error',
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'OK'
        })
    }
};

export const deletePreInvoiceApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/pre-invoices/delete/${_id}`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
    catch (error: any) {
        Swal.fire({
            title: 'ดำเนินการไม่สำเร็จ',
            text: `${error.response.data}`,
            icon: 'error',
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'OK'
        })
    }
};

export const getPreInvoiceForPrintApi = async (date: string) => {
    try {
        const response = await axios.get(`${baseUrl}/pre-invoices/for-pre-invoice-print/${date}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInvoiceForPrintApi = async (company_branch_id: string, insurance_company_id: string, date: string) => {
    try {
        const response = await axios.get(`${baseUrl}/pre-invoices/for-invoice-print/${company_branch_id}/${insurance_company_id}/${date}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
    catch (error: any) {
        console.log(error);
        Swal.fire({
            title: 'ดำเนินการไม่สำเร็จ',
            text: `${error.response.data}`,
            icon: 'error',
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'OK'
        })
    }
};