import axios from 'axios';
import { SparePartData } from '../../types/store/reducer/workOrder/createWorkOrderSliceTypes';
import { getCookies } from '../utils/common';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllWorkOrdersApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/work-orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

type AddData = {
    vehicle_owner_type_id: string;
    claim_history_id: string;
    vehicle_owner_work_place: string;
    vehicle_owner_tel: string;
    key_note: string;
    reparing_buget: number;
    after_repair_note: string;
    employee_id: string | null;
    parking_date: string | null;
    temporary_taking_vehicle_back_date: string | null;
    driving_date: string | null;
    taking_date: string | null;
    reparing_date: string | null;
    finish_reparing_date: string | null;
    spare_part_datas: SparePartData[],
}
export const createWorkOrderApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/work-orders`, data, {
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

export const getWorkOrderForEditApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/work-orders/for-edit/${_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editWorkOrderApi = async (data: AddData, _id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/work-orders/${_id}`, data, {
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


export const deleteWorkOrderApi = async (_id: string) => {
    try {
        const response = await axios.put(`${baseUrl}/work-orders/delete/${_id}`, {}, {
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

export const getWorkOrdersForPreviewAndPrintApi = async (_id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/work-orders/${_id}`, {
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