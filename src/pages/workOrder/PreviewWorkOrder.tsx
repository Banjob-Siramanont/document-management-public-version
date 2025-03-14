import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import Topic from '../../common/topic/Topic';
import TablePrimary from '../../common/table/TablePrimary';
import CardPrimary from '../../common/card/CardPrimary';
import HoverableButton from '../../common/button/HoverableButton';
import { GetWorkOrderForPreviewAndPrintData, GetWorkOrderForPreviewAndPrintResponse, SparePartData } from '../../types/helper/api/workOrderTypes';
import { getWorkOrdersForPreviewAndPrintApi } from '../../helper/api/workOrder';
import Loading from '../../components/Loading';

export default function PreviewWorkOrder() {

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [sparePartDatas, setSparePartDatas] = useState<SparePartData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [workOrderDatas, setWorkOrderDatas] = useState<GetWorkOrderForPreviewAndPrintData>({
        _id: '',
        vehicle_owner_type_name: '',
        vehicle_brand_eng_name: '',
        vehicle_model_eng_name: '',
        vehicle_color_name: '',
        insurance_company_short_name: '',
        ex_save: 0,
        license_plate: '',
        vehicle_owner_work_place: '',
        employee_full_name: '',
        parking_date: '',
        temporary_taking_vehicle_back_date: '',
        driving_date: '',
        taking_date: '',
        vehicle_owner_tel: '',
        reparing_buget: '',
        reparing_date: '',
        finish_reparing_date: '',
        key_note: '',
        spare_part_datas: [],
    });

    const getWorkOrdersForPreviewAndPrint = async () => {
        setIsLoading(true);
        try {
            const result: GetWorkOrderForPreviewAndPrintResponse = await getWorkOrdersForPreviewAndPrintApi(id as string);
            if (result.status === 'OK') {
                setWorkOrderDatas(result.data);
                setSparePartDatas(result.data.spare_part_datas);
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
        getWorkOrdersForPreviewAndPrint();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className='flex justify-between items-center'>
                <Topic text='รายละเอียดใบสั่งงาน' />
                <div className='flex justify-start items-center gap-x-2 mb-5'>
                    <HoverableButton
                        text='ปริ้น'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => navigate(`/print-work-order/?id=${id}`)}
                    />
                    <HoverableButton
                        text='แก้ไข'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => navigate(`/work-order-lists/edit?id=${id}`)}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-y-5'>
                <CardPrimary className='dark:text-smoothWhite'>
                    <div className='grid grid-cols-2 gap-x-2 max-[800px]:grid-cols-1'>
                        <InformationDetail topic='ประเภทเจ้าของรถ' detail={workOrderDatas.vehicle_owner_type_name} />
                        <InformationDetail topic='บริษัทประกัน' detail={`${workOrderDatas.insurance_company_short_name} (${workOrderDatas.vehicle_owner_work_place})`} />
                        <InformationDetail topic='ทุนประกัน' detail={workOrderDatas.reparing_buget} />
                        <InformationDetail topic='กุญแจ' detail={workOrderDatas.key_note} />
                        <InformationDetail topic='ยี่ห้อ' detail={`${workOrderDatas.vehicle_brand_eng_name} (${workOrderDatas.vehicle_color_name})`} />
                        <InformationDetail topic='รุ่น' detail={workOrderDatas.vehicle_model_eng_name} />
                        <InformationDetail topic='ทะเบียนรถ' detail={workOrderDatas.license_plate} />
                        <InformationDetail topic='วันที่ไปขับมา' detail={workOrderDatas.driving_date} />
                        <InformationDetail topic='วันที่ยกเข้า' detail={workOrderDatas.taking_date} />
                        <InformationDetail topic='วันที่เข้าจอด' detail={workOrderDatas.parking_date} />
                        <InformationDetail topic='วันที่เข้าเบิก' detail={workOrderDatas.temporary_taking_vehicle_back_date} />
                        <InformationDetail topic='ผู้ที่ทำการซ่อม' detail={workOrderDatas.employee_full_name} />
                        <InformationDetail topic='วันที่เข้าซ่อม' detail={workOrderDatas.reparing_date} />
                        <InformationDetail topic='วันที่ซ่อมเสร็จ' detail={workOrderDatas.finish_reparing_date} />
                        <InformationDetail topic='เบอร์เจ้าของรถ' detail={workOrderDatas.vehicle_owner_tel} />
                    </div>
                </CardPrimary>
                <CardPrimary>
                    <TablePrimary
                        data={sparePartDatas}
                        rowsPerPage={40}
                        tHeadDatas={[
                            { tHeadTiltle: 'ลำดับ', cssTextAlign: 'center', key: 'no' },
                            { tHeadTiltle: 'รายการอะไหล่', cssTextAlign: 'left', key: 'spare_part_name' },
                            { tHeadTiltle: 'ตรวจสอบ', cssTextAlign: 'center', key: 'is_inspect' },
                            { tHeadTiltle: 'เปลี่ยน', cssTextAlign: 'center', key: 'is_replace' },
                            { tHeadTiltle: 'ขัด / ดัด', cssTextAlign: 'center', key: 'is_polish' },
                            { tHeadTiltle: 'ทำสี', cssTextAlign: 'center', key: 'is_paint' },
                            { tHeadTiltle: 'ตัดต่อ', cssTextAlign: 'center', key: 'is_photoshop' },
                            { tHeadTiltle: 'ถ่ายรูป', cssTextAlign: 'center', key: 'is_photo' },
                            { tHeadTiltle: 'หมายเหตุ', cssTextAlign: 'left', key: 'note' },
                        ]}
                        keyNameOfId='id'
                        hasDeleteBtn={false}
                        hasEditBtn={false}
                    />
                </CardPrimary>
            </div>
        </>
    )
}

type InformationDetailProps = {
    topic: string;
    detail: string;
}
function InformationDetail({ topic, detail }: InformationDetailProps) {
    return (
        <div className='grid grid-cols-[130px_1fr] gap-x-2'>
            <div>{topic} :</div>
            <div>{detail}</div>
        </div>
    )
}