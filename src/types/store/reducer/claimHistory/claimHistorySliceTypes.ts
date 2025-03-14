export type ClaimHistoryData = {
    claimDate: string;
    selectedVehicleBrand: string;
    selectedVehicleModel: string;
    licensePlate: string;
    sender: string;
    selectedInsuranceCompany: string;
    claimNo: string;
    exSave: number;
    remuneration: number;
    selectedVehicleColor: string;
    finishReparingDate: string;
    customerTakingVehicleDate: string;
    offerReceiptDate: string;
};

export type Payload<Key extends keyof ClaimHistoryData> = {
    value: ClaimHistoryData[Key];
    variableName: Key;
}