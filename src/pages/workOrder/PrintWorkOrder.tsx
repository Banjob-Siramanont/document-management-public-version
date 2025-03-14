import { useEffect, useState } from 'react';

// Component
import PrintButton from '../components/PrintButton';

// css
import styles from '../../common/table/Table.module.css';
import { GetWorkOrderForPreviewAndPrintData, GetWorkOrderForPreviewAndPrintResponse, SparePartData } from '../../types/helper/api/workOrderTypes';
import { getWorkOrdersForPreviewAndPrintApi } from '../../helper/api/workOrder';
import Loading from '../../components/Loading';

export default function PrintWorkOrder() {
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
            <PrintButton text='ปริ้นใบสั่งงาน' />
            <div id='print-area' className='w-[21cm] h-full bg-white px-2'>
                <div className='mb-5 font-bold text-2xl'>ใบสั่งงาน</div>
                <div className='grid grid-cols-2 gap-x-2 text-lg mb-4'>
                    <InformationDetail topic='ประเภทเจ้าของรถ' detail={workOrderDatas.vehicle_owner_type_name} />
                    <div className='grid grid-cols-[140px_1fr] gap-x-2'>
                        <div>บริษัทประกัน :</div>
                        <div className='text-hyperLinkBlue'>{`${workOrderDatas.insurance_company_short_name} ${workOrderDatas.vehicle_owner_work_place ? `(${workOrderDatas.vehicle_owner_work_place})` : ''}`}</div>
                    </div>
                    {workOrderDatas.reparing_buget !== '0 บาท' && (
                        <div className='grid grid-cols-[140px_1fr] gap-x-2'>
                            <div>ทุนประกัน :</div>
                            <div><span className='bg-yellow-300'>{workOrderDatas.reparing_buget}</span></div>
                        </div>
                    )}
                    <InformationDetail topic='กุญแจ' detail={workOrderDatas.key_note} />
                    <div className='grid grid-cols-[140px_1fr] gap-x-2'>
                        <div>ยี่ห้อ :</div>
                        <div><span className='bg-yellow-300'>{`${workOrderDatas.vehicle_brand_eng_name} (${workOrderDatas.vehicle_color_name})`}</span></div>
                    </div>
                    <InformationDetail topic='รุ่น' detail={workOrderDatas.vehicle_model_eng_name} />
                    <InformationDetail topic='ทะเบียนรถ' detail={workOrderDatas.license_plate} />
                    {workOrderDatas.driving_date !== '-' && <InformationDetail topic='วันที่ไปขับมา' detail={workOrderDatas.driving_date} />}
                    {workOrderDatas.taking_date !== '-' && <InformationDetail topic='วันที่ยกเข้า' detail={workOrderDatas.taking_date} />}
                    {workOrderDatas.parking_date !== '-' && <InformationDetail topic='วันที่เข้าจอด' detail={workOrderDatas.parking_date} />}
                    {workOrderDatas.temporary_taking_vehicle_back_date !== '-' && <InformationDetail topic='วันที่เข้าเบิก' detail={workOrderDatas.temporary_taking_vehicle_back_date} />}
                    <InformationDetail topic='วันที่เข้าซ่อม' detail={workOrderDatas.reparing_date} />
                    <InformationDetail topic='วันที่ซ่อมเสร็จ' detail={workOrderDatas.finish_reparing_date} />
                    <InformationDetail topic='ผู้ที่ทำการซ่อม' detail={workOrderDatas.employee_full_name} />
                    <InformationDetail topic='เบอร์เจ้าของรถ' detail={workOrderDatas.vehicle_owner_tel} />
                    {String(workOrderDatas.ex_save) !== '' && (
                        <div className='grid grid-cols-[140px_1fr] gap-x-2'>
                            <div>EX-SAVE :</div>
                            <div><span className='bg-yellow-300'>{workOrderDatas.ex_save}</span></div>
                        </div>
                    )}
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className='p-0.5 text-center border bg-blue-300'>ลำดับ</th>
                            <th className='p-0.5 text-center border bg-blue-300'>รายการอะไหล่</th>
                            <th className='p-0.5 text-center border bg-yellow-300 text-sm'>ตรวจสอบ</th>
                            <th className='p-0.5 text-center border bg-orange-200'>เปลี่ยน</th>
                            <th className='p-0.5 text-center border bg-blue-300'>ขัด/ดัด</th>
                            <th className='p-0.5 text-center border bg-lightGrey'>ทำสี</th>
                            <th className='p-0.5 text-center border bg-pink-300'>ตัดต่อ</th>
                            <th className='p-0.5 text-center border bg-purple-300'>ถ่ายรูป</th>
                            <th className='text-center border'>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sparePartDatas.map((workOrderDatas, index) => (
                            <tr key={workOrderDatas.no}>
                                <td className='text-md border text-center'>{index + 1}</td>
                                <td className='text-md border text-left pl-2 whitespace-nowrap'>{workOrderDatas.spare_part_name}</td>
                                <td className='text-md border text-center'>{workOrderDatas.is_inspect}</td>
                                <td className='text-md border text-center bg-orange-100'>{workOrderDatas.is_replace}</td>
                                <td className='text-md border text-center'>{workOrderDatas.is_polish}</td>
                                <td className='text-md border text-center'>{workOrderDatas.is_paint}</td>
                                <td className='text-md border text-center'>{workOrderDatas.is_photoshop}</td>
                                <td className='text-md border text-center'>{workOrderDatas.is_photo}</td>
                                <td className='text-md border text-left pl-2'>{workOrderDatas.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

type InformationDetailProps = {
    topic: string;
    detail?: string;
}

function InformationDetail({ topic, detail }: InformationDetailProps) {
    return (
        <div className='grid grid-cols-[140px_1fr] gap-x-2'>
            <div>{topic} :</div>
            <div className={`${detail ? '' : 'border-b'}`}>{detail}</div>
        </div>
    )
}
