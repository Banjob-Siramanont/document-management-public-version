import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { deleteInsuranceCompanyApi, getAllInsuranceCompanyApi } from '../../helper/api/insuranceCompany';
import { filteredData } from '../../helper/utils/filter';

// Type
import { GetAllInsuranceCompanyResponse, GetInsuranceCompanyData, PostInsuranceCompanyResponse } from '../../types/helper/api/insuranceCompanyTypes';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary'
import Topic from '../../common/topic/Topic';
import Loading from '../../components/Loading';

export default function InsuranceCompanyLists() {

    const navigate = useNavigate();
    const [insuranceCompanyDatas, setInsuranceCompanyDatas] = useState<GetInsuranceCompanyData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteInsuranceCompany = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostInsuranceCompanyResponse = await deleteInsuranceCompanyApi(id);

            if (result.status === 'OK') {
                getAllInsuranceCompany();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบบริษัท ${result.data.insurance_company_short_name}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                })
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleDeleteInsuranceCompany = (id: string) => {
        Swal.fire({
            title: `ลบบริษัท ${filteredData(insuranceCompanyDatas, id, '_id', 'insurance_company_short_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteInsuranceCompany(id) });
    };

    const getAllInsuranceCompany = async () => {
        setIsLoading(true);
        try {
            const result: GetAllInsuranceCompanyResponse = await getAllInsuranceCompanyApi();
            if (result.status === 'OK') return setInsuranceCompanyDatas(result.data)
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
        getAllInsuranceCompany();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='บริษัทประกันภัยทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={insuranceCompanyDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'ชื่อบริษัท', cssTextAlign: 'left', key: 'insurance_company_name' },
                        { tHeadTiltle: 'ชื่อย่อบริษัท', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'วันที่เข้าเป็นอู่ในสัญญา', cssTextAlign: 'left', key: 'insurance_company_alliance_date' },
                        { tHeadTiltle: 'เลขประจำตัวผู้เสียภาษี', cssTextAlign: 'left', key: 'insurance_company_tax_id' },
                        { tHeadTiltle: 'ที่อยู่', cssTextAlign: 'left', key: 'insurance_company_address' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/insurance-company-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteInsuranceCompany(id as string)}
                />
            </CardPrimary>
        </>
    )
}