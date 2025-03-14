import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteReceiptApi, getAllReceiptsApi } from '../../helper/api/receipt';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';

// Type
import { PostReceiptResponse, GetAllReceiptsResponse, GetReceiptData } from '../../types/helper/api/receiptTypes';
import Loading from '../../components/Loading';

export default function ReceiptList() {

    const navigate = useNavigate();
    const [receiptDatas, setReceiptDatas] = useState<GetReceiptData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteReceipt = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostReceiptResponse = await deleteReceiptApi(id);
            if (result.status === 'OK') {
                getAllReceipts();
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบใบเสร็จเลขที่ ${result.data.receipt_no}`,
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: 'var(--color-orange)',
                    confirmButtonText: 'OK'
                });
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

    const handleDeleteReceipt = (id: string) => {
        Swal.fire({
            title: `ลบใบเสร็จเลขที่ ${filteredData(receiptDatas, id, '_id', 'receipt_no')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteReceipt(id) });
    };

    const getAllReceipts = async () => {
        setIsLoading(true);
        try {
            const result: GetAllReceiptsResponse = await getAllReceiptsApi();
            if (result.status === 'OK') return setReceiptDatas(result.data);
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
        getAllReceipts();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ใบเสร็จรับเงินทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={receiptDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'สาขา', cssTextAlign: 'left', key: 'company_branch_name' },
                        { tHeadTiltle: 'ลูกค้า', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'บิลเลขที่', cssTextAlign: 'left', key: 'receipt_no' },
                        { tHeadTiltle: 'วันที่', cssTextAlign: 'left', key: 'receipt_create_date' },
                        { tHeadTiltle: 'จำนวนเงิน', cssTextAlign: 'right', key: 'receipt_total_price' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    hasExtraBtn={true}
                    extraButtonText='ปริ้นใบเสร็จ'
                    editOnClick={id => navigate(`/receipt-lists/edit?id=${id}`)}
                    extraOnClick={id => navigate(`/print-receipt/?id=${id}`)}
                    deleteOnClick={id => handleDeleteReceipt(id as string)}
                />
            </CardPrimary>
        </>
    )
}
