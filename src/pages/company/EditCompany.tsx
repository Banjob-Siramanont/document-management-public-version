import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { isEmailFormat, numericWithoutText } from '../../helper/utils/validateValue';
import { editCompanyDataApi, getCompanyDataApi } from '../../helper/api/company';

// Company
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import InputPrimary from '../../common/input/InputPrimary';
import TopicOfCard from '../../common/topic/TopicOfCard';
import ActionButtons from '../components/ActionButtons';

// Type
import { GetCompanyDataResponse, PutCompanyBranchResponse } from '../../types/helper/api/companyTypes';
import Loading from '../../components/Loading';

export default function EditCompany() {

    const navigate = useNavigate();

    const [companyId, setCompanyId] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companyTaxId, setCompanyTaxId] = useState<string>('');
    const [companyTel, setCompanyTel] = useState<string>('');
    const [companyEmail, setCompanyEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editCompanyData = async () => {
        setIsLoading(true);
        const dataToSend = {
            company_name: companyName,
            company_tax_id: companyTaxId,
            company_tel: companyTel,
            company_email: companyEmail
        }
        try {
            const result: PutCompanyBranchResponse = await editCompanyDataApi(dataToSend, companyId);

            if (result.status === 'OK') {
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขข้อมูลบริษัท`,
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

    const handleEditCompanyData = () => {
        Swal.fire({
            title: 'แก้ไขข้อมูลบริษัท',
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editCompanyData() });
    };

    const getCompanyData = async () => {
        setIsLoading(true);
        try {
            const result: GetCompanyDataResponse = await getCompanyDataApi();

            if (result.status === 'OK') {
                setCompanyId(result.data._id);
                setCompanyName(result.data.company_name);
                setCompanyTaxId(result.data.company_tax_id);
                setCompanyTel(result.data.company_tel);
                setCompanyEmail(result.data.company_email);
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
        getCompanyData()
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขข้อมูลบริษัท' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลบริษัท' />
                <ThreeColumnGrid>
                    <InputPrimary
                        labelTag='ชื่อบริษัท'
                        type='text'
                        value={companyName}
                        onChange={event => setCompanyName(event.target.value)}
                    />
                    <InputPrimary
                        labelTag='เลขประจำตัวผู้เสียภาษีอากร'
                        type='text'
                        value={companyTaxId}
                        maxLength={13}
                        onChange={event => setCompanyTaxId(event.target.value)}
                    />
                    <InputPrimary
                        labelTag='เบอร์ติดต่อ'
                        type='text'
                        value={companyTel}
                        maxLength={10}
                        onChange={event => setCompanyTel(numericWithoutText(event.target.value))}
                    />
                    <InputPrimary
                        labelTag='Email'
                        type='email'
                        value={companyEmail}
                        onChange={event => setCompanyEmail(event.target.value)}
                        textHelper={isEmailFormat(companyEmail) ? '' : '**กรุณากรอกเป็นรูปแบบอีเมล เช่น example@hotmail.com'}
                    />
                </ThreeColumnGrid>

                <ActionButtons
                    cancelPath='/about-company'
                    actionText='แก้ไข'
                    onClick={() => handleEditCompanyData()}
                />
            </CardPrimary>
        </>
    )
}
