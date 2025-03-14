export type GetSparePartData = {
    no: number;
    _id: string;
    spare_part_name: string;
    vehicle_model_id: string;
    vehicle_model_eng_name: string;
    vehicle_brand_id: string;
    vehicle_brand_eng_name: string;
};

export type GetAllSparePartsResponse = {
    status: 'OK' | 'NG';
    data: GetSparePartData[];
    client_message: string;
};

export type PostSparePartData = {
    vehicle_model: string;
    spare_part_name: string;
    spare_part_status: string;
    _id: string;
    spare_part_create_date: string;
    __v: number;
};

export type PostSparePartResponse = {
    status: 'OK' | 'NG';
    data: PostSparePartData;
    client_message: string;
};

export type GetSparePartResponse = {
    status: 'OK' | 'NG';
    data: GetSparePartData;
    client_message: string;
};

export type SparePartFromVehicleModelData = {
    no: number;
    _id: string;
    spare_part_name: string;
    vehicle_model_id: string;
    vehicle_model_eng_name: string;
    vehicle_brand_id: string;
    vehicle_brand_eng_name: string;
};

export type GetAllSparePartFromVehicleModelResponse = {
    status: 'OK' | 'NG';
    data: SparePartFromVehicleModelData[];
    client_message: string;
};