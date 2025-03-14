import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_URL;

type AddData = {
    user_tel: string;
    user_password: string;
};

export const loginApi = async (data: AddData) => {
    try {
        const response = await axios.post(`${baseUrl}/auth`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    }
    catch (error: any) {
        console.log(error);
        Swal.fire({
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: `${error.response.data}`,
            icon: 'error',
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'OK'
        })
    }
};