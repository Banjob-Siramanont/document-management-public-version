export type CompanyBranchData = {
    id: string | number,
    companyBranchName: string;
    companyBranchAddress: string;
};

export type CompanyData = {
    companyName: string;
    companyTaxId: string;
    companyTel: string;
    companyEmail: string;
    companyBranchs: CompanyBranchData[]
};

export type Payload<Key extends keyof CompanyData> = {
    value: CompanyData[Key];
    variableName: Key;
}