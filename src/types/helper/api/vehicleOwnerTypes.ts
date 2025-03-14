export type GetAllVehicleOwnerTypeData = {
    _id: string;
    vehicle_owner_type_name: string;
};

export type GetAllVehicleOwnerTypeDatasResponse = {
    status: 'OK' | 'NG';
    data: GetAllVehicleOwnerTypeData[];
    client_message: string;
};