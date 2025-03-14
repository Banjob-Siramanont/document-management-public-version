import { useEffect, useMemo, useState } from 'react';

// Helper
import { getAllVehicleBrandsApi } from '../../../helper/api/vehicleBrand';

// Component
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputPrimary from '../../../common/input/InputPrimary';
import SelectPrimary from '../../../common/select/SelectPrimary';

// Type
import { GetAllVehicleBrandsResponse, GetVehicleBrandData } from '../../../types/helper/api/vehicleBrandTypes';
import { GetAllVehicleModelResponse, GetVehicleModelData } from '../../../types/helper/api/vehicleModelTypes';
import { getAllVehicleModelsApi } from '../../../helper/api/vehicleModel';

type BasicInformationProps = {
    selectedVehicleBrand: string;
    setSelectedVehicleBrand: (value: string) => void;
    vehicleModelEngName: string;
    setVehicleModelEngName: (value: string) => void;
    vehicleModelThaiName: string;
    setVehicleModelThaiName: (value: string) => void;
};
export default function BasicInformation({
    selectedVehicleBrand,
    setSelectedVehicleBrand,
    vehicleModelEngName,
    setVehicleModelEngName,
    vehicleModelThaiName,
    setVehicleModelThaiName,
}: BasicInformationProps) {

    const [vehicleBrandDatas, setVehicleBrandDatas] = useState<GetVehicleBrandData[]>([]);
    const [vehicleModelDatas, setVehicleModelDatas] = useState<GetVehicleModelData[]>([]);

    const vehicleModelListEngName = useMemo(() =>
        vehicleModelDatas.map(vehicleModelData => (vehicleModelData.vehicle_model_eng_name?.toLowerCase().trim() || ''
        )),
        [vehicleModelDatas]
    );
    const vehicleModelListThaiName = useMemo(() =>
        vehicleModelDatas.map(vehicleModelData => (
            vehicleModelData.vehicle_model_thai_name?.toLowerCase().trim() || ''
        )),
        [vehicleModelDatas]
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

    const getAllVehicleModels = async () => {
        try {
            const result: GetAllVehicleModelResponse = await getAllVehicleModelsApi();

            if (result.status === 'OK') return setVehicleModelDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllVehicleBrands();
        getAllVehicleModels();
    }, []);

    return (
        <ThreeColumnGrid>
            <SelectPrimary
                labelTag='ยี่ห้อรถ'
                optionDatas={vehicleBrandDatas}
                selectedValue={selectedVehicleBrand}
                keyValue='_id'
                keyDisplayValue='vehicle_brand_eng_name'
                onChange={value => setSelectedVehicleBrand(value as string)}
            />
            <InputPrimary
                labelTag='รุ่นรถ (ภาษาอังกฤษ)'
                placeholder='PCX 150'
                type='text'
                value={vehicleModelEngName}
                onChange={event => setVehicleModelEngName(event.target.value)}
                textHelper={vehicleModelListEngName.includes(vehicleModelEngName?.toLowerCase().trim()) ? 'มีรุ่นนี้อยู่ในระบบแล้ว' : ''}
            />
            <InputPrimary
                labelTag='รุ่นรถ (ภาษาไทย)'
                placeholder='พีซีเอ็กซ์ 150'
                type='text'
                value={vehicleModelThaiName}
                onChange={event => setVehicleModelThaiName(event.target.value)}
                textHelper={vehicleModelListThaiName.includes(vehicleModelThaiName?.toLowerCase().trim()) ? 'มีรุ่นนี้อยู่ในระบบแล้ว' : ''}
            />
        </ThreeColumnGrid>
    )
}