import Swal from 'sweetalert2';
import { useState } from 'react';

// Helper
import { addCompanyBranchApi } from '../../helper/api/companyBranch';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';
import BasicInformation from './components/BasicInformation';
import Loading from '../../components/Loading';

// Type
import { PostCompanyBranchResponse } from '../../types/helper/api/companyBranchTypes';

export default function AddCompanyBranch() {

    const [companyBranchName, setCompanyBranchName] = useState<string>('');
    const [companyBranchAddress, setCompanyBranchAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addCompanyBranch = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch_name: companyBranchName,
            company_branch_address: companyBranchAddress
        };

        try {
            const result: PostCompanyBranchResponse = await addCompanyBranchApi(dataToSend);
            if (result.status === 'OK') {
                setCompanyBranchName('');
                setCompanyBranchAddress('');

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่มสาขา ${result.data.company_branch_name} ที่อยู่ ${result.data.company_branch_address}`,
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

    const handleAddCompanyBranch = () => {
        Swal.fire({
            title: `เพิ่มสาขา ${companyBranchName} ที่อยู่ ${companyBranchAddress}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addCompanyBranch() })
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มสาขา' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลสาขา' />

                <BasicInformation
                    companyBranchName={companyBranchName}
                    setCompanyBranchName={value => setCompanyBranchName(value)}
                    companyBranchAddress={companyBranchAddress}
                    setCompanyBranchAddress={value => setCompanyBranchAddress(value)}
                />

                <ActionButtons
                    cancelPath='/about-company'
                    actionText='เพิ่ม'
                    onClick={() => handleAddCompanyBranch()}
                />
            </CardPrimary>
        </>
    )
}
