import axios from 'axios';
import { ReplacingSparePartData, WageData } from '../../types/store/reducer/quotation/quotationSliceTypes';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

type AddData = {
    company_branch_id: string;
    claim_history_id: string;
    vehicle_name: string;
    wage_datas: WageData[];
    replacing_spare_part_datas: ReplacingSparePartData[]
};

export const getAllQuotationsApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/quotations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuotationApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/quotations/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuotationForEditApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/quotations/for-edit/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editQuotationApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/quotations/${_id}`, data, {
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

export const getQuotationForPrintApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/quotations/for-print/${_id}`, {
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


export const createQuotationApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/quotations`, data, {
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

export const deleteQuotationApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/quotations/delete/${_id}`, {}, {
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