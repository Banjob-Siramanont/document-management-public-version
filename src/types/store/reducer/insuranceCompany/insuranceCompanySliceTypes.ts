export type InsuranceCompanyData = {
    insuranceCompanyName: string;
    insuranceCompanyShortName: string;
    insuranceCompanyAddress: string;
    insuranceCompanyTaxId: string;
    insuranceCompanyAllianceDate: string;
};

export type Payload<Key extends keyof InsuranceCompanyData> = {
    value: InsuranceCompanyData[Key];
    variableName: Key;
}