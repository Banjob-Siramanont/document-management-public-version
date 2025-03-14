import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteSparePartApi, getAllSparePartsApi } from '../../helper/api/sparePart';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';

// Type
import { GetAllSparePartsResponse, GetSparePartData, PostSparePartResponse } from '../../types/helper/api/sparePartTypes';
import Loading from '../../components/Loading';

export default function SparePartList() {

    const navigate = useNavigate();

    const [sparePartDatas, setSparePartDatas] = useState<GetSparePartData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteSparePart = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostSparePartResponse = await deleteSparePartApi(id);

            if (result.status === 'OK') {
                getAllSpareParts();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบ ${result.data.spare_part_name}`,
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

    const handleDeleteSparePart = (id: string) => {
        Swal.fire({
            title: `ลบ ${filteredData(sparePartDatas, id, '_id', 'spare_part_name')} ของ ${filteredData(sparePartDatas, id, '_id', 'vehicle_brand_eng_name')} ${filteredData(sparePartDatas, id, '_id', 'vehicle_model_eng_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteSparePart(id) });
    };

    const getAllSpareParts = async () => {
        setIsLoading(true);
        try {
            const result: GetAllSparePartsResponse = await getAllSparePartsApi();

            if (result.status === 'OK') return setSparePartDatas(result.data);
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
        getAllSpareParts();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='รายการอะไหล่ทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={sparePartDatas}
                    rowsPerPage={3000}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'อะไหล่', cssTextAlign: 'left', key: 'spare_part_name' },
                        { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_eng_name' },
                        { tHeadTiltle: 'รุ่น', cssTextAlign: 'left', key: 'vehicle_model_eng_name' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/spare-part-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteSparePart(id as string)}
                />
            </CardPrimary>
        </>
    )
}
