import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteVehicleModelApi, getAllVehicleModelsApi } from '../../helper/api/vehicleModel';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetAllVehicleModelResponse, GetVehicleModelData, PostVehicleModelResponse } from '../../types/helper/api/vehicleModelTypes';
import Loading from '../../components/Loading';

export default function VehicleModelLists() {

    const navigate = useNavigate();
    const [vehicleModelDatas, setVehicleModelDatas] = useState<GetVehicleModelData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteVehicleModel = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostVehicleModelResponse = await deleteVehicleModelApi(id);

            if (result.status === 'OK') {
                getAllVehicleModels();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบ ${result.data.vehicle_model_eng_name}`,
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

    const handleDeleteVehicleModel = (id: string) => {
        Swal.fire({
            title: `ลบรุ่น ${filteredData(vehicleModelDatas, id, '_id', 'vehicle_model_eng_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteVehicleModel(id) });
    };

    const getAllVehicleModels = async () => {
        setIsLoading(true);
        try {
            const result: GetAllVehicleModelResponse = await getAllVehicleModelsApi();

            if (result.status === 'OK') return setVehicleModelDatas(result.data);
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
        getAllVehicleModels();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='รุ่นทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={vehicleModelDatas}
                    rowsPerPage={200}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_eng_name' },
                        // { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_thai_name' },
                        { tHeadTiltle: 'รุ่น', cssTextAlign: 'left', key: 'vehicle_model_eng_name' },
                        // { tHeadTiltle: 'รุ่น', cssTextAlign: 'left', key: 'vehicle_model_thai_name' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/vehicle-model-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteVehicleModel(id as string)}
                />
            </CardPrimary>
        </>
    )
}
