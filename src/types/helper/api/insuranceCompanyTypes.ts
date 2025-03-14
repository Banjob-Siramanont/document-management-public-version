export type GetInsuranceCompanyData = {
    no: number,
    _id: string;
    insurance_company_name: string;
    insurance_company_short_name: string;
    insurance_company_address: string;
    insurance_company_tax_id: string;
    insurance_company_alliance_date: string;
};

export type GetAllInsuranceCompanyResponse = {
    status: 'OK' | 'NG';
    data: GetInsuranceCompanyData[];
    client_message: string;
};

export type GetInsuranceCompanyResponse = {
    status: 'OK' | 'NG';
    data: GetInsuranceCompanyData;
    client_message: string;
};

export type PostInsuranceCompanyData = {
    _id: string;
    insurance_company_name: string;
    insurance_company_short_name: string;
    insurance_company_address: string;
    insurance_company_tax_id: string;
    insurance_company_status: string;
    insurance_company_create_date: string;
    insurance_company_alliance_date: string;
    __v: number,
};

export type PostInsuranceCompanyResponse = {
    status: 'OK' | 'NG';
    data: PostInsuranceCompanyData;
    client_message: string;
};
