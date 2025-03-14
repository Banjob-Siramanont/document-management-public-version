import axios from 'axios';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllCompanyBranchesApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/company-branches`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    company_branch_name: string;
    company_branch_address: string;
};
export const addCompanyBranchApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/company-branches`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getCompanyBranchApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/company-branches/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCompanyBranchApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/company-branches/${_id}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCompanyBranchApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/company-branches/delete/${_id}`, {}, {
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