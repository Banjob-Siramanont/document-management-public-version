export type GetCompanyData = {
    _id: string;
    company_name: string;
    company_tax_id: string;
    company_tel: string;
    company_email: string;
};

export type GetCompanyDataResponse = {
    status: 'OK' | 'NG';
    data: GetCompanyData;
    client_message: string;
};

export type PutCompanyBranchData = {
    _id: string;
    company_name: string;
    company_tax_id: string;
    company_tel: string;
    company_email: string;
    company_status: string;
    company_create_date: string;
    __v: 0
};

export type PutCompanyBranchResponse = {
    status: 'OK' | 'NG';
    data: PutCompanyBranchData;
    client_message: string;
};