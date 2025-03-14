import axios from 'axios';
import { getCookies } from '../utils/common';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllVehicleOwnerTypesApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/vehicle-owner-types`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};