import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { deleteQuotationCoverApi, getAllQuotationsCoverApi } from '../../helper/api/quotationCover';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import Topic from '../../common/topic/Topic';
import Loading from '../../components/Loading';
import QuotationCoverTable from './components/QuotationCoverTable';

export default function QuotationCoverLists() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [quotationCoverDatas, setQuotationCoverDatas] = useState([]);

    const navigate = useNavigate();

    const deleteQuotation = async (id: string) => {
        setIsLoading(true);
        try {
            const result: { status: 'OK' | 'NG'; client_message: string; } = await deleteQuotationCoverApi(id);
            if (result.status === 'OK') {
                getAllQuotationCovers();
                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: '',
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
    }

    const handleDeleteQuotationCover = (id: string) => {
        Swal.fire({
            title: 'ลบใบปะหน้า',
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteQuotation(id) });
    };

    const getAllQuotationCovers = async () => {
        setIsLoading(true);
        try {
            const result: any = await getAllQuotationsCoverApi();
            if (result.status === 'OK') return setQuotationCoverDatas(result.data);
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
        getAllQuotationCovers();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ใบปะหน้าทั้งหมด' />
            <CardPrimary>
                <QuotationCoverTable
                    data={quotationCoverDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'เลขทะเบียน', cssTextAlign: 'left', key: 'claim_id_datas' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    hasExtraBtn={true}
                    deleteButtonText='ลบ'
                    editButtonText='แก้ไข'
                    extraButtonText='ปริ้น'
                    deleteOnClick={id => handleDeleteQuotationCover(id as string)}
                    editOnClick={id => navigate(`/quotation-cover-lists/edit/?id=${id}`)}
                    extraOnClick={id => navigate(`/print-quotation-cover/?id=${id}`)}
                />
            </CardPrimary>
        </>
    )
}
