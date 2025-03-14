import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Company
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';
import { GetEmployeeResponse, PostEmployeeResponse } from '../../types/helper/api/employeeTypes';
import { editEmployeeApi, getEmployeeApi } from '../../helper/api/employee';
import Loading from '../../components/Loading';

export default function EditEmployee() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedJobPosition, setSelectedJobPosition] = useState<string>('');
    const [employeeFirstName, setEmployeeFirstName] = useState<string>('');
    const [employeeLastName, setEmployeeLastName] = useState<string>('');
    const [employeeNickName, setEmployeeNickName] = useState<string>('');
    const [startWorkingdate, setStartWorkingdate] = useState<string>('');
    const [startPaySocialSecurityDate, setStartPaySocialSecurityDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editEmployee = async () => {
        setIsLoading(true);
        const dataToSend = {
            employee_title: selectedTitle,
            employee_first_name: employeeFirstName,
            employee_last_name: employeeLastName,
            employee_nick_name: employeeNickName,
            employee_job_position: selectedJobPosition,
            employee_start_working_date: startWorkingdate,
            employee_start_pay_social_security_date: startPaySocialSecurityDate,
        }
        try {
            const result: PostEmployeeResponse = await editEmployeeApi(dataToSend, id as string);

            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขพนักงาน ${result.data.employee_first_name} ${result.data.employee_last_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/employee-lists'));
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleEditEmployee = () => {
        Swal.fire({
            title: 'แก้ไขพนักงาน',
            text: `${employeeFirstName} ${employeeLastName} (${employeeNickName})`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editEmployee() });
    };

    const getEmployee = async () => {
        setIsLoading(true);
        try {
            const result: GetEmployeeResponse = await getEmployeeApi(id as string);

            if (result.status === 'OK') {
                setSelectedTitle(result.data.title_id);
                setSelectedJobPosition(result.data.job_position_id);
                setEmployeeFirstName(result.data.employee_first_name);
                setEmployeeLastName(result.data.employee_last_name);
                setEmployeeNickName(result.data.employee_nick_name);
                setStartWorkingdate(result.data.employee_start_working_date);
                setStartPaySocialSecurityDate(result.data.employee_start_pay_social_security_date);
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขพนักงาน' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลพนักงาน' />
                <BasicInformation
                    selectedJobPosition={selectedJobPosition}
                    setSelectedJobPosition={_id => setSelectedJobPosition(_id)}
                    selectedTitle={selectedTitle}
                    setSelectedTitle={_id => setSelectedTitle(_id)}
                    employeeFirstName={employeeFirstName}
                    setEmployeeFirstName={value => setEmployeeFirstName(value)}
                    employeeLastName={employeeLastName}
                    setEmployeeLastName={value => setEmployeeLastName(value)}
                    employeeNickName={employeeNickName}
                    setEmployeeNickName={value => setEmployeeNickName(value)}
                    startWorkingdate={startWorkingdate}
                    setStartWorkingdate={formattedDate => setStartWorkingdate(formattedDate)}
                    startPaySocialSecurityDate={startPaySocialSecurityDate}
                    setStartPaySocialSecurityDate={formattedDate => setStartPaySocialSecurityDate(formattedDate)}
                />
                <ActionButtons
                    cancelPath='/employee-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditEmployee()}
                />
            </CardPrimary>
        </>
    )
}
