export type SparePartData = {
    id: number;
    spare_part_id: string;
    spare_part_actions: string[];
    note: string;
};

export type CreateWorkOrderData = {
    selectedClaimHistory: string;
    vehicleKey: string;
    afterRepairNote: string;
    vehicleOwnerWorkPlace: string;
    vehicleOwnerTel: string;
    reparingBudget: number;
    selectedDriverType: string;
    parkingDate: string;
    temporaryTakingVehicleBackDate: string;
    drivingDate: string;
    takingDate: string;
    mechanicId: string;
    reparingDate: string;
    finishReparingDate: string;
    sparePartDatas: SparePartData[],
};

export type Payload<Key extends keyof CreateWorkOrderData> = {
    value: CreateWorkOrderData[Key];
    variableName: Key;
}