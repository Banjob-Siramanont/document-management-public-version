import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookies } from '../utils/common';
import { ClaimIdData } from '../../types/store/reducer/quotationCover/quotationCoverSliceTypes';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

type AddData = {
    claim_id_datas: ClaimIdData[];
};

export const getAllQuotationsCoverApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/quotation-cover`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getQuotationCoverApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/quotation-cover/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editQuotationCoverApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/quotation-cover/${_id}`, data, {
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

export const getQuotationCoverForPrintApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/quotation-cover/for-print/${_id}`, {
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


export const createQuotationCoverApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/quotation-cover`, data, {
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

export const deleteQuotationCoverApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/quotation-cover/delete/${_id}`, {}, {
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