import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteCompanyBranchApi, getAllCompanyBranchesApi } from '../../helper/api/companyBranch';

// Company
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetAllCompanyBranchesResponse, GetCompanyBranchData, PostCompanyBranchResponse } from '../../types/helper/api/companyBranchTypes';
import TopicOfCard from '../../common/topic/TopicOfCard';
import { GetCompanyDataResponse } from '../../types/helper/api/companyTypes';
import { getCompanyDataApi } from '../../helper/api/company';
import Loading from '../../components/Loading';

export default function AboutCompany() {

    const navigate = useNavigate();
    const [companyBranchDatas, setCompanyBranchdatas] = useState<GetCompanyBranchData[]>([]);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyTaxId, setCompanyTaxId] = useState<string>('');
    const [companyTel, setCompanyTel] = useState<string>('');
    const [companyEmail, setCompanyEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteCompanyBranch = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostCompanyBranchResponse = await deleteCompanyBranchApi(id);

            if (result.status === 'OK') {
                getAllCompanyBranches();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบสาขา ${result.data.company_branch_name}`,
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

    const handleDeleteCompanyBranch = (id: string) => {
        Swal.fire({
            title: `ลบสาขา ${filteredData(companyBranchDatas, id, '_id', 'company_branch_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteCompanyBranch(id) });
    };

    const getAllCompanyBranches = async () => {
        try {
            const result: GetAllCompanyBranchesResponse = await getAllCompanyBranchesApi();
            if (result.status === 'OK') return setCompanyBranchdatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getCompanyData = async () => {
        try {
            const result: GetCompanyDataResponse = await getCompanyDataApi();

            if (result.status === 'OK') {
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
    };

    useEffect(() => {
        getCompanyData();
        getAllCompanyBranches();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='เกี่ยวกับบริษัท' />
            <CardPrimary className='mb-4'>
                <TopicOfCard text='ข้อมูลบริษัท' />
                <div className='grid grid-cols-[auto_1fr] gap-x-2'>
                    <InformationDetail topic='ชื่อบริษัท' detail={companyName} />
                    <InformationDetail topic='เลขผู้เสียภาษี' detail={companyTaxId} />
                    <InformationDetail topic='โทร' detail={companyTel} />
                    <InformationDetail topic='Email' detail={companyEmail} />
                </div>

            </CardPrimary>
            <CardPrimary>
                <TopicOfCard text='ข้อมูลสาขา' />
                <TablePrimary
                    data={companyBranchDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'ชื่อสาขา', cssTextAlign: 'left', key: 'company_branch_name' },
                        { tHeadTiltle: 'ที่อยู่', cssTextAlign: 'left', key: 'company_branch_address' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/company-branch/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteCompanyBranch(id as string)}
                />
            </CardPrimary>
        </>
    )
}

function InformationDetail({ topic, detail }: { topic: string, detail: string }) {
    return (
        <>
            <div className='dark:text-smoothWhite'>{topic}</div>
            <div className='dark:text-smoothWhite'>{detail}</div>
        </>
    )
}