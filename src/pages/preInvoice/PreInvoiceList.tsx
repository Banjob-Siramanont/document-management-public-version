import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deletePreInvoiceApi, getAllPreInvoicesApi } from '../../helper/api/preInvoice';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary'
import Topic from '../../common/topic/Topic';
import HoverableButton from '../../common/button/HoverableButton';

// Type
import { GetAllPreInvoiceData, GetAllPreInvoiceDatasResponse, PostPreInvoiceResponse } from '../../types/helper/api/preInvoiceType';
import Loading from '../../components/Loading';

export default function PreInvoiceList() {

    const navigate = useNavigate();
    const [preInvoiceDatas, setPreInvoiceDatas] = useState<GetAllPreInvoiceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteSparePart = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostPreInvoiceResponse = await deletePreInvoiceApi(id);
            if (result.status === 'OK') {
                getAllPreInvoice();
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
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
    };

    const handleDeletePreInvoice = (id: string) => {
        Swal.fire({
            title: `ลบใบแจ้งหนี้ เลขที่เคลม ${filteredData(preInvoiceDatas, id, '_id', 'claim_no')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteSparePart(id) });
    };

    const getAllPreInvoice = async () => {
        setIsLoading(true);
        try {
            const result: GetAllPreInvoiceDatasResponse = await getAllPreInvoicesApi();

            if (result.status === 'OK') return setPreInvoiceDatas(result.data);
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
        getAllPreInvoice();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className='flex justify-between items-center'>
                <Topic text='ใบแจ้งหนี้ทั้งหมด' />
                <div className='flex justify-end item-center gap-x-2'>
                    <HoverableButton
                        text='ปริ้นใบวางบิล'
                        textColor='text-emeraldGreen'
                        bgColor='bg-emeraldGreen'
                        borderColor='border-emeraldGreen'
                        onClick={() => navigate('/print-invoice')}
                    />
                    <HoverableButton
                        text='ปริ้นใบแจ้งหนี้'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => navigate('/print-pre-invoice')}
                    />
                </div>
            </div>
            <CardPrimary>
                <TablePrimary
                    data={preInvoiceDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'สาขา', cssTextAlign: 'left', key: 'company_branch_name' },
                        { tHeadTiltle: 'ลูกค้า', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'วันที่สร้างเอกสาร', cssTextAlign: 'left', key: 'pre_invoice_create_date' },
                        { tHeadTiltle: 'เลขที่เคลม', cssTextAlign: 'left', key: 'claim_no' },
                        { tHeadTiltle: 'เลขทะเบียน', cssTextAlign: 'left', key: 'license_plate' },
                        { tHeadTiltle: 'จำนวนเงินทั้งหมด', cssTextAlign: 'right', key: 'pre_invoice_total_price' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/pre-invoice-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeletePreInvoice(id as string)}
                />
            </CardPrimary>
        </>
    )
}