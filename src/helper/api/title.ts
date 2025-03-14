import axios from 'axios';
import { getCookies } from '../utils/common';

const baseUrl = import.meta.env.VITE_API_URL;
const token = getCookies('_auth');

export const getAllTitlesApi = async () => {
    try {
        const response = await axios.get(`${baseUrl}/titles`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};