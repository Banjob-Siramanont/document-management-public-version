import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteJobPositionApi, getAllJobPositionsApi } from '../../helper/api/jobPosition';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetAllJobPositionsResponse, GetJobPositionData, PostJobPositionResponse } from '../../types/helper/api/jobPositionTypes';
import Loading from '../../components/Loading';


export default function JobPositionLists() {

    const navigate = useNavigate();
    const [jobPositionDatas, setJobPositionDatas] = useState<GetJobPositionData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteJobPosition = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostJobPositionResponse = await deleteJobPositionApi(id);

            if (result.status === 'OK') {
                getAllJobPositions();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบตำแหน่งงาน ${result.data.job_position_name}`,
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

    const handleDeleteJobPosition = (id: string) => {
        Swal.fire({
            title: `ลบตำแหน่งงาน ${filteredData(jobPositionDatas, id, '_id', 'job_position_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteJobPosition(id) });
    };


    const getAllJobPositions = async () => {
        setIsLoading(true);
        try {
            const result: GetAllJobPositionsResponse = await getAllJobPositionsApi();
            if (result.status === 'OK') return setJobPositionDatas(result.data);
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
        getAllJobPositions();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ตำแหน่งงานทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={jobPositionDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'ตำแหน่งงาน', cssTextAlign: 'left', key: 'job_position_name' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/job-position-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteJobPosition(id as string)}
                />
            </CardPrimary>
        </>
    )
}
