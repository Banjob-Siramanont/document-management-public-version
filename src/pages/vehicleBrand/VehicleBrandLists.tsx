import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper
import { deleteVehicleBrandApi, getAllVehicleBrandsApi } from '../../helper/api/vehicleBrand';
import { filteredData } from '../../helper/utils/filter';

// Component
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import Topic from '../../common/topic/Topic';

// Type
import { GetVehicleBrandData, GetAllVehicleBrandsResponse, PostVehicleBrandResponse } from '../../types/helper/api/vehicleBrandTypes';
import Loading from '../../components/Loading';

export default function VehicleBrandLists() {

    const navigate = useNavigate();
    const [vehicleBrandDatas, setVehicleBrandDatas] = useState<GetVehicleBrandData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteVehicleBrand = async (id: string) => {
        setIsLoading(true);
        try {
            const result: PostVehicleBrandResponse = await deleteVehicleBrandApi(id);

            if (result.status === 'OK') {
                getAllVehicleBrands();

                Swal.fire({
                    title: 'ดำเนินการสำเร็จ',
                    text: `ลบยี่ห้อรถ ${result.data.vehicle_brand_eng_name}`,
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

    const handleDeleteVehicleBrand = (id: string) => {
        Swal.fire({
            title: `ลบยี่ห้อ ${filteredData(vehicleBrandDatas, id, '_id', 'vehicle_brand_eng_name')}`,
            text: 'เมื่อกดลบ จะย้อนกลับมาแก้ไขไม่ได้ !!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-orange)',
            confirmButtonText: 'ลบ',
            cancelButtonColor: 'var(--color-alarmRed)',
            cancelButtonText: 'ไม่ลบ',
        }).then(result => { if (result.isConfirmed) deleteVehicleBrand(id) });
    };

    const getAllVehicleBrands = async () => {
        setIsLoading(true);
        try {
            const result: GetAllVehicleBrandsResponse = await getAllVehicleBrandsApi();
            if (result.status === 'OK') return setVehicleBrandDatas(result.data);
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
        getAllVehicleBrands();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <Topic text='ยี่ห้อทั้งหมด' />
            <CardPrimary>
                <TablePrimary
                    data={vehicleBrandDatas}
                    rowsPerPage={25}
                    tHeadDatas={[
                        { tHeadTiltle: 'No.', cssTextAlign: 'center', key: 'no' },
                        { tHeadTiltle: 'Brand', cssTextAlign: 'left', key: 'vehicle_brand_eng_name' },
                        { tHeadTiltle: 'ยี่ห้อ', cssTextAlign: 'left', key: 'vehicle_brand_thai_name' },
                        { tHeadTiltle: 'Action', cssTextAlign: 'center' },
                    ]}
                    keyNameOfId='_id'
                    editOnClick={id => navigate(`/vehicle-brand-lists/edit?id=${id}`)}
                    deleteOnClick={id => handleDeleteVehicleBrand(id as string)}
                />
            </CardPrimary>
        </>
    )
}
