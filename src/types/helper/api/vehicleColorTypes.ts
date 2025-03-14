export type GetVehicleColorData = {
    no: number;
    _id: string;
    vehicle_color_name: string;
};

export type GetAllVehicleColorResponse = {
    status: 'OK' | 'NG';
    data: GetVehicleColorData[];
    client_message: string;
};

export type PostVehicleColorData = {
    vehicle_color_name: string;
    vehicle_color_status: string;
    _id: string;
    vehicle_color_create_date: string;
    __v: number
};

export type PostVehicleColorResponse = {
    status: 'OK' | 'NG';
    data: PostVehicleColorData;
    client_message: string;
};