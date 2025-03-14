export type VehicleBrandData = {
    vehicleEngName: string;
    vehicleThaiName: string;
};

export type Payload<Key extends keyof VehicleBrandData> = {
    value: VehicleBrandData[Key];
    variableName: Key;
}