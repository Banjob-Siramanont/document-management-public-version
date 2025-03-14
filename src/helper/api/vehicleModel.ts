import axios from 'axios';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllVehicleModelsApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-models`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    vehicle_brand: string;
    vehicle_model_eng_name: string;
    vehicle_model_thai_name: string;
};
export const addVehicleModelApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/vehicle-models`, data, {
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

export const getVehicleModelApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-models/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editVehicleModelApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/vehicle-models/${_id}`, data, {
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

export const deleteVehicleModelApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/vehicle-models/delete/${_id}`, {}, {
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

export const getVehicleModelFromVehicleBrandApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-models/from-vehicle-brand/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};