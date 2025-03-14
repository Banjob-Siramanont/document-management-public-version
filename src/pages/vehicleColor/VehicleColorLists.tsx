import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { filteredData } from '../../helper/utils/filter';
import { deleteVehicleColorApi, getAllVehicleColorsApi } from '../../helper/api/vehicleColor';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetAllVehicleColorResponse, GetVehicleColorData, PostVehicleColorResponse } from '../../types/helper/api/vehicleColorTypes';
import Loading from '../../components/Loading';

export default function VehicleColorLists() {

    const navigate = useNavigate();
    const [vehicleColorDatas, setVehicleColorDatas] = useState<GetVehicleColorData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteVehicleColor = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostVehicleColorResponse = await deleteVehicleColorApi(id);

            if (result.status === 'OK') {
                getAllVehicleColors();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบ ${result.data.vehicle_color_name}`,
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

    const handleDeleteVehicleColor = (id: string) => {
        Swal.fire({
            title: `ลบ ${filteredData(vehicleColorDatas, id, '_id', 'vehicle_color_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteVehicleColor(id) });
    };

    const getAllVehicleColors = async () => {
        setIsLoading(true);
        try {
            const result: GetAllVehicleColorResponse = await getAllVehicleColorsApi();

            if (result.status === 'OK') return setVehicleColorDatas(result.data);
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
        getAllVehicleColors()
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='สีทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={vehicleColorDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'สี', cssTextAlign: 'left', key: 'vehicle_color_name' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/vehicle-color-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteVehicleColor(id as string)}
                />
            </CardPrimary>
        </>
    )
}
