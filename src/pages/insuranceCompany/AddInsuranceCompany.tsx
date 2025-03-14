import Swal from 'sweetalert2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { resetInsuranceCompanyDatas } from '../../store/reducer/insuranceCompanySlice/InsuranceCompanySlice';

// Helper
import { addInsuranceCompanyApi } from '../../helper/api/insuranceCompany';

// Component
import Topic from '../../common/topic/Topic';
import TopicOfCard from '../../common/topic/TopicOfCard';
import CardPrimary from '../../common/card/CardPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import BasicInformation from './components/BasicInformation';
import ActionButtons from '../components/ActionButtons';

// Type
import { PostInsuranceCompanyResponse } from '../../types/helper/api/insuranceCompanyTypes';
import Loading from '../../components/Loading';

export default function AddInsuranceCompany() {

    const {
        insuranceCompanyName,
        insuranceCompanyShortName,
        insuranceCompanyAddress,
        insuranceCompanyTaxId,
        insuranceCompanyAllianceDate,
    } = useSelector((state: RootState) => state.insuranceCompanyDataStateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addInsuranceCompany = async () => {
        setIsLoading(true);
        const dataToSend = {
            insurance_company_name: insuranceCompanyName,
            insurance_company_short_name: insuranceCompanyShortName,
            insurance_company_address: insuranceCompanyAddress,
            insurance_company_tax_id: insuranceCompanyTaxId,
            insurance_company_alliance_date: insuranceCompanyAllianceDate,
        };

        try {
            const result: PostInsuranceCompanyResponse = await addInsuranceCompanyApi(dataToSend);
            if (result.status === 'OK') {
                dispatch(resetInsuranceCompanyDatas());

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `เพิ่มบริษัทประกันภัย ${result.data.insurance_company_short_name}`,
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

    const handleAddInsuranceCompany = () => {
        Swal.fire({
            title: `เพิ่มบริษัท ${insuranceCompanyShortName}`,
            text: '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'เพิ่ม',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่เพิ่ม',
        }).then(result => { if (result.isConfirmed) addInsuranceCompany() });
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เพิ่มบริษัทประกันภัย' />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลบริษัทประกันภัย' />
                <ThreeColumnGrid>
                    <BasicInformation />
                </ThreeColumnGrid>
                <ActionButtons
                    cancelPath='/insurance-company-lists'
                    actionText='เพิ่ม'
                    onClick={() => handleAddInsuranceCompany()}
                />
            </CardPrimary>
        </>
    )
}