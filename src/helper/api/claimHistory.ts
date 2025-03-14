import axios from 'axios';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllClaimHistoriesApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/claim-histories`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    claim_date: string;
    vehicle_brand_id: string;
    vehicle_model_id: string;
    license_plate: string;
    sender: string;
    insurance_company_id: string;
    claim_no: string;
    ex_save: number;
    remuneration: number;
};
export const addClaimHistoryApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/claim-histories`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
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

export const getClaimHistoryApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/claim-histories/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editClaimHistoryApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/claim-histories/${_id}`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
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

export const deleteClaimHistoryApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/claim-histories/delete/${_id}`, {}, {
            headers: { 'Authorization': `Bearer ${token}` },
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

export const getAllClaimHistoryForNoQuotationApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/claim-histories/no-quotation-id`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllClaimHistoryForNoPreInvoiceApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/claim-histories/no-pre-invoice-id`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllClaimHistoryForNoWorkOrderApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/claim-histories/no-work-order-id`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
