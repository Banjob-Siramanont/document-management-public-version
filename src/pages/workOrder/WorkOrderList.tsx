import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// helper
import { filteredData } from '../../helper/utils/filter';
import { deleteWorkOrderApi, getAllWorkOrdersApi } from '../../helper/api/workOrder';
// import { convertDateToThai } from '../../helper/utils/date';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';

// Type
import { GetAllWorkOrderResponse, GetWorkOrderData } from '../../types/helper/api/workOrderTypes';
import Loading from '../../components/Loading';

export default function WorkOrderList() {

    const navigate = useNavigate();
    const [workOrderDatas, setWorkOrderDatas] = useState<GetWorkOrderData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteWorkOrder = async (id: string) => {
        setIsLoading(true);
        try {
            const result: { data: { _id: string }; client_message: string; status: 'OK' | 'NG' } = await deleteWorkOrderApi(id);
            if (result.status === 'OK') {
                getAllWorkOrders();
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

    const handleDeleteWorkOrder = (id: string) => {
        Swal.fire({
            title: `ลบใบสั่งงานเลขที่เคลม ${filteredData(workOrderDatas, id, '_id', 'claim_no')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteWorkOrder(id) });
    };

    const getAllWorkOrders = async () => {
        setIsLoading(true);
        try {
            const result: GetAllWorkOrderResponse = await getAllWorkOrdersApi();
            if (result.status === 'OK') return setWorkOrderDatas(result.data);
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
        getAllWorkOrders();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ใบสั่งงานทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={workOrderDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'ประเภทเจ้าของรถ', cssTextAlign: 'center', key: 'vehicle_owner_type_name' },
                        { tHeadTiltle: 'บริษัทประกัน', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'เลขที่เคลม', cssTextAlign: 'left', key: 'claim_no' },
                        { tHeadTiltle: 'เลขทะเบียน', cssTextAlign: 'left', key: 'license_plate' },
                        { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_eng_name' },
                        { tHeadTiltle: 'รุ่น', cssTextAlign: 'left', key: 'vehicle_model_eng_name' },
                        { tHeadTiltle: 'เบอร์ติดต่อ', cssTextAlign: 'left', key: 'vehicle_owner_tel' },
                        { tHeadTiltle: 'วันที่เริ่มซ่อม', cssTextAlign: 'left', key: 'reparing_date' },
                        { tHeadTiltle: 'วันที่ซ่อมเสร็จ', cssTextAlign: 'left', key: 'finish_reparing_date' },
                        { tHeadTiltle: 'ผู้ที่ทำการซ่อม', cssTextAlign: 'left', key: 'employee_full_name' },
                        { tHeadTiltle: 'หมายเหตุหลังซ่อมเสร็จ', cssTextAlign: 'left', key: 'after_repair_note' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editButtonText='รายละเอียด'
                    editOnClick={id => navigate(`/preview-work-order/?id=${id}`)}
                    deleteOnClick={id => handleDeleteWorkOrder(id as string)}
                />
            </CardPrimary>
        </>
    )
}
