import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteQuotationApi, getAllQuotationsApi } from '../../helper/api/quotation';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';

// Type
import { GetAllQuotationDatasResponse, QuotationData } from '../../types/helper/api/quotationTypes';
import Loading from '../../components/Loading';

export default function QuotatationLists() {

    const navigate = useNavigate();

    const [quotationDatas, setQuotationDatas] = useState<QuotationData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteQuotation = async (id: string) => {
        setIsLoading(true);
        try {
            const result: { status: 'OK' | 'NG'; client_message: string; } = await deleteQuotationApi(id);
            if (result.status === 'OK') {
                getAllQuotations();
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

    const handleDeleteQuotation = (id: string) => {
        Swal.fire({
            title: `ลบใบเสนอราคา เลขเคลม ${filteredData(quotationDatas, id, '_id', 'claim_no')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteQuotation(id) });
    };

    const getAllQuotations = async () => {
        setIsLoading(true);
        try {
            const result: GetAllQuotationDatasResponse = await getAllQuotationsApi();
            if (result.status === 'OK') return setQuotationDatas(result.data);
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
        getAllQuotations();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ใบเสนอราคาทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={quotationDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'สาขา', cssTextAlign: 'left', key: 'company_branch_name' },
                        { tHeadTiltle: 'บริษัทประกันภัย', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'วันที่สร้างเอกสาร', cssTextAlign: 'left', key: 'quotation_create_date' },
                        { tHeadTiltle: 'ชื่อรถจักรยานยนต์', cssTextAlign: 'left', key: 'vehicle_name' },
                        { tHeadTiltle: 'เลขทะเบียน', cssTextAlign: 'left', key: 'license_plate' },
                        { tHeadTiltle: 'เลขที่เคลม', cssTextAlign: 'left', key: 'claim_no' },
                        { tHeadTiltle: 'ราคา ซ่อม / เคาะพ่นสี', cssTextAlign: 'right', key: 'total_wage_price' },
                        { tHeadTiltle: 'ราคา เปลี่ยนอะไหล่', cssTextAlign: 'right', key: 'total_replacing_spare_part_price' },
                        { tHeadTiltle: 'ราคารวม', cssTextAlign: 'right', key: 'total_price' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editButtonText='ดูรายละเอียด'
                    editOnClick={id => navigate(`/preview-quotation/?id=${id}`)}
                    deleteOnClick={id => handleDeleteQuotation(id as string)}
                />
            </CardPrimary>
        </>
    )
}