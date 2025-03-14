import axios from 'axios';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllVehicleBrandsApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-brands`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    vehicle_brand_eng_name: string;
    vehicle_brand_thai_name: string;
};
export const addVehicleBrandApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/vehicle-brands`, data, {
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

export const getVehicleBrandApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-brands/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editVehicleBrandApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/vehicle-brands/${_id}`, data, {
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

export const deleteVehicleBrandApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/vehicle-brands/delete/${_id}`, {}, {
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