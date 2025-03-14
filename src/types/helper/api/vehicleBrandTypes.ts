export type GetVehicleBrandData = {
    no: number;
    _id: string;
    vehicle_brand_eng_name: string;
    vehicle_brand_thai_name: string;
};

export type GetAllVehicleBrandsResponse = {
    status: 'OK' | 'NG';
    data: GetVehicleBrandData[];
    client_message: string;
};

export type PostVehicleBrandData = {
    vehicle_brand_eng_name: string;
    vehicle_brand_thai_name: string;
    vehicle_brand_status: string;
    _id: string;
    vehicle_brand_create_date: string;
    __v: number;
};

export type PostVehicleBrandResponse = {
    status: 'OK' | 'NG';
    data: PostVehicleBrandData;
    client_message: string;
};

export type GetVehicleBrandResponse = {
    status: 'OK' | 'NG';
    data: GetVehicleBrandData;
    client_message: string;
};
