export type GetVehicleModelData = {
    no: number;
    _id: string;
    vehicle_brand_id: string;
    vehicle_brand_eng_name: string;
    vehicle_brand_thai_name: string;
    vehicle_model_eng_name: string;
    vehicle_model_thai_name: string;
};

export type GetAllVehicleModelResponse = {
    status: 'OK' | 'NG';
    data: GetVehicleModelData[];
    client_message: string;
};

export type GetVehicleModelResponse = {
    status: 'OK' | 'NG';
    data: GetVehicleModelData;
    client_message: string;
};

export type PostVehicleModelData = {
    vehicle_brand: string;
    vehicle_model_eng_name: string;
    vehicle_model_thai_name: string;
    vehicle_model_status: string;
    _id: string;
    vehicle_model_create_date: string;
    __v: number;
};

export type PostVehicleModelResponse = {
    status: 'OK' | 'NG';
    data: PostVehicleModelData;
    client_message: string;
};