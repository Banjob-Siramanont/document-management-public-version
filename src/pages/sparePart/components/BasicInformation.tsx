import { useEffect, useMemo, useState } from 'react';

// Helper
import { getAllVehicleBrandsApi } from '../../../helper/api/vehicleBrand';
import { getVehicleModelFromVehicleBrandApi } from '../../../helper/api/vehicleModel';
import { getAllSparePartsFromVehicleModelApi } from '../../../helper/api/sparePart';

// Component
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';
import SelectSearch from '../../../common/select/SelectSearch';

// Type
import { GetAllVehicleBrandsResponse, GetVehicleBrandData } from '../../../types/helper/api/vehicleBrandTypes';
import { GetAllVehicleModelResponse, GetVehicleModelData } from '../../../types/helper/api/vehicleModelTypes';
import { GetAllSparePartFromVehicleModelResponse, SparePartFromVehicleModelData } from '../../../types/helper/api/sparePartTypes';

type BasicInformationProps = {
    selectedVehicleBrand: string;
    setSelectedVehicleBrand: (value: string) => void;
    selectedVehicleModel: string;
    setSelectedVehicleModel: (value: string) => void;
    sparePartName: string;
    setSparePartName: (value: string) => void;
};
export default function BasicInformation({
    selectedVehicleBrand,
    setSelectedVehicleBrand,
    selectedVehicleModel,
    setSelectedVehicleModel,
    sparePartName,
    setSparePartName,
}: BasicInformationProps) {

    const [vehicleBrandDatas, setVehicleBrandDatas] = useState<GetVehicleBrandData[]>([]);
    const [vehicleModelDatas, setVehicleModelDatas] = useState<GetVehicleModelData[]>([]);
    const [sparePartOptionDatas, setSparePartOptionDatas] = useState<SparePartFromVehicleModelData[]>([]);
    const sparePartList = useMemo(() =>
        sparePartOptionDatas.map(sparePartOptionData => (sparePartOptionData.spare_part_name?.toLowerCase().trim() || ''
        )),
        [sparePartOptionDatas]
    );

    const getAllVehicleBrands = async () => {
        try {
            const result: GetAllVehicleBrandsResponse = await getAllVehicleBrandsApi();
            if (result.status === 'OK') return setVehicleBrandDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getVehicleModelFromVehicleBrand = async (vehicle_brand_id: string) => {
        try {
            const result: GetAllVehicleModelResponse = await getVehicleModelFromVehicleBrandApi(vehicle_brand_id);

            if (result.status === 'OK') return setVehicleModelDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error)
        }
    };

    const getAllSparePartsFromVehicleModel = async () => {
        try {
            const result: GetAllSparePartFromVehicleModelResponse = await getAllSparePartsFromVehicleModelApi(selectedVehicleModel);
            if (result.status === 'OK') setSparePartOptionDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleSelectVehicleBrand = (vehicle_brand_id: string) => {
        if (vehicle_brand_id === selectedVehicleBrand) return
        getVehicleModelFromVehicleBrand(vehicle_brand_id);
        setSelectedVehicleModel('');
        setSelectedVehicleBrand(vehicle_brand_id);
    };

    useEffect(() => {
        getAllVehicleBrands();
    }, []);

    useEffect(() => {
        if (vehicleModelDatas.length > 0 || selectedVehicleBrand === '') return
        getVehicleModelFromVehicleBrand(selectedVehicleBrand);
    }, [selectedVehicleBrand]);

    useEffect(() => {
        if (selectedVehicleModel === '') return;
        getAllSparePartsFromVehicleModel();
    }, [selectedVehicleModel]);

    return (
        <ThreeColumnGrid>
            <SelectPrimary
                labelTag='ยี่ห้อรถ'
                optionDatas={vehicleBrandDatas}
                selectedValue={selectedVehicleBrand}
                keyValue='_id'
                keyDisplayValue='vehicle_brand_eng_name'
                onChange={value => handleSelectVehicleBrand(value as string)}
            />
            <SelectSearch
                labelTag='รุ่นรถ'
                optionDatas={vehicleModelDatas}
                selectedValue={selectedVehicleModel}
                keyValue='_id'
                keyDisplayValue='vehicle_model_eng_name'
                onChange={value => setSelectedVehicleModel(value as string)}
            />
            <InputPrimary
                labelTag='ชื่ออะไหล่'
                placeholder='บังโคลน / พักเท้า L / พักเท้า R / เบาะ / กันตก'
                type='text'
                value={sparePartName}
                onChange={event => setSparePartName(event.target.value)}
                textHelper={sparePartList.includes(sparePartName?.toLowerCase().trim()) ? 'มีอะไหล่ชิ้นนี้อยู่ในระบบแล้ว' : ''}
            />
        </ThreeColumnGrid>
    )
}