import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';
import { editInsuranceCompanyApi, getInsuranceCompanyApi } from '../../helper/api/insuranceCompany';
import { GetInsuranceCompanyResponse, PostInsuranceCompanyResponse } from '../../types/helper/api/insuranceCompanyTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetInsuranceCompanyDatas, setInsuranceCompanyDatas } from '../../store/reducer/insuranceCompanySlice/InsuranceCompanySlice';
import Loading from '../../components/Loading';

export default function EditInsuranceCompany() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        insuranceCompanyName,
        insuranceCompanyShortName,
        insuranceCompanyAddress,
        insuranceCompanyTaxId,
        insuranceCompanyAllianceDate,
    } = useSelector((state: RootState) => state.insuranceCompanyDataStateValue);

    const editInsuranceCompany = async () => {
        setIsLoading(true);
        const dataToSend = {
            insurance_company_name: insuranceCompanyName,
            insurance_company_short_name: insuranceCompanyShortName,
            insurance_company_address: insuranceCompanyAddress,
            insurance_company_tax_id: insuranceCompanyTaxId,
            insurance_company_alliance_date: insuranceCompanyAllianceDate,
        }
        try {
            const result: PostInsuranceCompanyResponse = await editInsuranceCompanyApi(dataToSend, id as string);

            if (result.status === 'OK') {
                dispatch(resetInsuranceCompanyDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `แก้ไขบริษัท ${result.data.insurance_company_short_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                }).then(() => navigate('/insurance-company-lists'));
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

    const handleEditInsuranceCompany = () => {
        Swal.fire({
            title: `แก้ไขบริษัท ${insuranceCompanyShortName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'แก้ไข',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่แก้ไข',
        }).then(result => { if (result.isConfirmed) editInsuranceCompany() });
    };

    const getInsuranceCompany = async () => {
        setIsLoading(true);
        try {
            const result: GetInsuranceCompanyResponse = await getInsuranceCompanyApi(id as string)
            if (result.status === 'OK') {
                dispatch(setInsuranceCompanyDatas({ value: result.data.insurance_company_name, variableName: 'insuranceCompanyName' }));
                dispatch(setInsuranceCompanyDatas({ value: result.data.insurance_company_short_name, variableName: 'insuranceCompanyShortName' }));
                dispatch(setInsuranceCompanyDatas({ value: result.data.insurance_company_tax_id, variableName: 'insuranceCompanyTaxId' }));
                dispatch(setInsuranceCompanyDatas({ value: result.data.insurance_company_alliance_date, variableName: 'insuranceCompanyAllianceDate' }));
                dispatch(setInsuranceCompanyDatas({ value: result.data.insurance_company_address, variableName: 'insuranceCompanyAddress' }));
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
        getInsuranceCompany();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='แก้ไขบริษัทประกันภัย' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลบริษัทประกันภัย' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/insurance-company-lists'
                    actionText='แก้ไข'
                    onClick={() => handleEditInsuranceCompany()}
                />
            </CardPrimary>
        </>
    )
}