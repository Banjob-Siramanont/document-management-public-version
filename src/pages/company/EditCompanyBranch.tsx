import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { editCompanyBranchApi, getCompanyBranchApi } from '../../helper/api/companyBranch';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TopicOfCard from '../../common/topic/TopicOfCard';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { GetCompanyBranchResponse, PostCompanyBranchResponse } from '../../types/helper/api/companyBranchTypes';
import Loading from '../../components/Loading';

export default function EditCompanyBranch() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [companyBranchName, setCompanyBranchName] = useState<string>('');
    const [companyBranchAddress, setCompanyBranchAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editCompanyBranch = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_branch_name: companyBranchName,
            company_branch_address: companyBranchAddress,
        }
        try {
            const result: PostCompanyBranchResponse = await editCompanyBranchApi(dataToSend, id as string);

            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขสาขา ${result.data.company_branch_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/about-company'));
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleEditCompanyBranch = () => {
        Swal.fire({
            title: `แก้ไขสาขา ${companyBranchName} ที่อยู่ ${companyBranchAddress}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editCompanyBranch() });
    };

    const getCompanyBranch = async () => {
        setIsLoading(true);
        try {
            const result: GetCompanyBranchResponse = await getCompanyBranchApi(id as string)
            if (result.status === 'OK') {
                setCompanyBranchName(result.data.company_branch_name)
                setCompanyBranchAddress(result.data.company_branch_address)
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCompanyBranch();
    }, []);

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
                    actionText='แก้ไข'
                    onClick={() => handleEditCompanyBranch()}
                />
            </CardPrimary>
        </>
    )
}
