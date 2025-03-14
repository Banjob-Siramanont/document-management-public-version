import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addEmployeeApi } from '../../helper/api/employee';

// Company
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';

// Type
import { PostEmployeeResponse } from '../../types/helper/api/employeeTypes';
import Loading from '../../components/Loading';

export default function AddEmployee() {

    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedJobPosition, setSelectedJobPosition] = useState<string>('');
    const [employeeFirstName, setEmployeeFirstName] = useState<string>('');
    const [employeeLastName, setEmployeeLastName] = useState<string>('');
    const [employeeNickName, setEmployeeNickName] = useState<string>('');
    const [startWorkingdate, setStartWorkingdate] = useState<string>('');
    const [startPaySocialSecurityDate, setStartPaySocialSecurityDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addEmployee = async () => {
        setIsLoading(true);
        const dataToSend = {
            employee_title: selectedTitle,
            employee_first_name: employeeFirstName,
            employee_last_name: employeeLastName,
            employee_nick_name: employeeNickName,
            employee_job_position: selectedJobPosition,
            employee_start_working_date: startWorkingdate,
            employee_start_pay_social_security_date: startPaySocialSecurityDate,
        };

        try {
            const result: PostEmployeeResponse = await addEmployeeApi(dataToSend);
            if (result.status === 'OK') {
                setSelectedTitle('');
                setSelectedJobPosition('');
                setEmployeeFirstName('');
                setEmployeeLastName('');
                setEmployeeNickName('');
                setStartWorkingdate('');
                setStartPaySocialSecurityDate('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่มพนักงาน ${result.data.employee_first_name} ${result.data.employee_last_name} (${result.data.employee_nick_name})`,
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
    };

    const handleAddEmployee = () => {
        Swal.fire({
            title: 'เพิ่มพนักงาน',
            text: `${employeeFirstName} ${employeeLastName} (${employeeNickName})`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addEmployee() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มพนักงาน' />
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
                    actionText='เพิ่ม'
                    onClick={() => handleAddEmployee()}
                />
            </CardPrimary>
        </>
    )
}
