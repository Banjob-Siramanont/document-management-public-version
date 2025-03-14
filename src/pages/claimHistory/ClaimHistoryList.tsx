import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteClaimHistoryApi, getAllClaimHistoriesApi } from '../../helper/api/claimHistory';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';
import Loading from '../../components/Loading';

// Type
import { GetAllClaimHistorysResponse, GetClaimHistoryData, PostClaimHistoryResponse } from '../../types/helper/api/claimHistoryTypes';
import { getCookies } from '../../helper/utils/common';

export default function ClaimHistoryList() {

    const navigate = useNavigate();

    // Get current month and year in Buddhist Era (BE)
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('th-TH', { month: 'long' }); // 'มีนาคม'
    const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const previousMonth = previousMonthDate.toLocaleString('th-TH', { month: 'long' }); // 'กุมภาพันธ์'
    const currentYearBE = currentDate.getFullYear() + 543; // Convert AD to BE

    const [claimHistoryDatas, setClaimHistoryDatas] = useState<GetClaimHistoryData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const claimDateList = useMemo(() =>
        claimHistoryDatas.map(claimHistoryData => (claimHistoryData.claim_date?.toLowerCase().trim() || ''
        )),
        [claimHistoryDatas]
    );

    const amountOfVehicleClaimThisMonth = useMemo(() => {
        return claimDateList.filter(claimDate => {
            const [_, month, year] = claimDate.split(' '); // Split into parts
            return month === currentMonth && parseInt(year) === currentYearBE;
        }).length;
    }, [claimDateList]);

    const amountOfVehicleClaimPreviousMonth = useMemo(() => {
        return claimDateList.filter(claimDate => {
            const [_, month, year] = claimDate.split(' '); // Split into parts
            return month === previousMonth && parseInt(year) === currentYearBE;
        }).length;
    }, [claimDateList]);


    const deleteClaimHistory = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostClaimHistoryResponse = await deleteClaimHistoryApi(id);

            if (result.status === 'OK') {
                getAllClaimHistory();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบเลขเคลม ${result.data.claim_no}`,
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

    const handleDeleteClaimHistory = (id: string) => {
        Swal.fire({
            title: `ลบเลขเคลม ${filteredData(claimHistoryDatas, id, '_id', 'claim_no')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteClaimHistory(id) });
    };

    const getAllClaimHistory = async () => {
        setIsLoading(true);
        try {
            const result: GetAllClaimHistorysResponse = await getAllClaimHistoriesApi();
            if (result.status === 'OK') return setClaimHistoryDatas(result.data)
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
        getAllClaimHistory();
        getCookies('');
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ประวัติรถเข้าเคลม' />
            <CardPrimary>

                <TablePrimary
                    data={claimHistoryDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'วันที่เข้าเคลม', cssTextAlign: 'left', key: 'claim_date' },
                        { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_eng_name' },
                        { tHeadTiltle: 'รุ่น', cssTextAlign: 'left', key: 'vehicle_model_eng_name' },
                        { tHeadTiltle: 'เลขทะเบียน', cssTextAlign: 'left', key: 'license_plate' },
                        { tHeadTiltle: 'สีของรถ', cssTextAlign: 'left', key: 'vehicle_color_name' },
                        { tHeadTiltle: 'ผู้ทำเคลม', cssTextAlign: 'left', key: 'sender' },
                        { tHeadTiltle: 'บริษัทประกันภัย', cssTextAlign: 'left', key: 'insurance_company_short_name' },
                        { tHeadTiltle: 'เลขที่เคลม', cssTextAlign: 'left', key: 'claim_no' },
                        { tHeadTiltle: 'วันที่รถซ่อมเสร็จ', cssTextAlign: 'left', key: 'finish_reparing_date' },
                        { tHeadTiltle: 'วันที่ลูกค้ารับรถ', cssTextAlign: 'left', key: 'customer_permanently_take_vehicle_back_date' },
                        { tHeadTiltle: 'วันที่สร้างใบสั่งงาน', cssTextAlign: 'left', key: 'work_order_create_date' },
                        { tHeadTiltle: 'วันที่เสนอราคา', cssTextAlign: 'left', key: 'quotation_create_date' },
                        { tHeadTiltle: 'วันที่วางบิล', cssTextAlign: 'left', key: 'pre_invoice_create_date' },
                        { tHeadTiltle: 'วันที่ออกใบเสร็จ / ใบกำกับภาษี', cssTextAlign: 'left', key: 'receipt_create_date' },
                        { tHeadTiltle: 'EX-SAVE', cssTextAlign: 'right', key: 'ex_save' },
                        { tHeadTiltle: 'Note', cssTextAlign: 'right', key: 'remuneration' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/claim-history-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteClaimHistory(id as string)}
                />
                <div className='dark:text-smoothWhite'>
                    จำนวนรถเข้าเคลมเดือน <span className='dark:text-alarmYellow text-emeraldGreen'>{currentMonth} {currentYearBE}</span> : <span className='dark:text-alarmYellow text-emeraldGreen'>{amountOfVehicleClaimThisMonth}</span> คัน
                </div>
                <div className='dark:text-smoothWhite'>
                    จำนวนรถเข้าเคลมเดือน <span className='dark:text-alarmYellow text-emeraldGreen'>{previousMonth} {currentYearBE}</span> : <span className='dark:text-alarmYellow text-emeraldGreen'>{amountOfVehicleClaimPreviousMonth}</span> คัน
                </div>
            </CardPrimary>
        </>
    )
}
