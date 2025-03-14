import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteEmployeeApi, getAllEmployeeApi } from '../../helper/api/employee';

// Company
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetAllEmployeesResponse, GetEmployeeData, PostEmployeeResponse } from '../../types/helper/api/employeeTypes';
import Loading from '../../components/Loading';

export default function EmployeeList() {

    const navigate = useNavigate();

    const [employeeDatas, setEmployeeDatas] = useState<GetEmployeeData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteEmployee = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostEmployeeResponse = await deleteEmployeeApi(id);

            if (result.status === 'OK') {
                getAllEmployees();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบพนักงาน ${result.data.employee_first_name} ${result.data.employee_last_name} (${result.data.employee_nick_name})`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                })
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleDeleteEmployee = (id: string) => {
        Swal.fire({
            title: `ลบพนักงาน ${filteredData(employeeDatas, id, '_id', 'employee_first_name')} ${filteredData(employeeDatas, id, '_id', 'employee_last_name')} (${filteredData(employeeDatas, id, '_id', 'employee_nick_name')})`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteEmployee(id) });
    };

    const getAllEmployees = async () => {
        setIsLoading(true);
        try {
            const result: GetAllEmployeesResponse = await getAllEmployeeApi();
            if (result.status === 'OK') return setEmployeeDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='พนักงานทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={employeeDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'คำนำหน้าชื่อ', cssTextAlign: 'left', key: 'title_abbreviation' },
                        { tHeadTiltle: 'ชื่อ', cssTextAlign: 'left', key: 'employee_first_name' },
                        { tHeadTiltle: 'นามสกุล', cssTextAlign: 'left', key: 'employee_last_name' },
                        { tHeadTiltle: 'ชื่อเล่น', cssTextAlign: 'left', key: 'employee_nick_name' },
                        { tHeadTiltle: 'ตำแหน่งงาน', cssTextAlign: 'left', key: 'job_position_name' },
                        { tHeadTiltle: 'วันที่เข้าประประกันสังคม', cssTextAlign: 'left', key: 'employee_start_pay_social_security_date' },
                        { tHeadTiltle: 'วันเริ่มงาน', cssTextAlign: 'left', key: 'employee_start_working_date' },
                        { tHeadTiltle: 'อายุงาน', cssTextAlign: 'left', key: 'employee_experience' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/employee-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteEmployee(id as string)}
                />
            </CardPrimary>
        </>
    )
}
