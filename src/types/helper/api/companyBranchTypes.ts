export type GetCompanyBranchData = {
    no: number;
    _id: string;
    company_branch_name: string;
    company_branch_address: string;
};

export type GetAllCompanyBranchesResponse = {
    status: 'OK' | 'NG';
    data: GetCompanyBranchData[];
    client_message: string;
};

export type PostCompanyBranchData = {
    company_branch_name: string;
    company_branch_address: string;
    company_branch_status: string;
    _id: string;
    company_branch_create_date: string;
    __v: number;
};

export type PostCompanyBranchResponse = {
    status: 'OK' | 'NG';
    data: PostCompanyBranchData;
    client_message: string;
};

export type GetCompanyBranchResponse = {
    status: 'OK' | 'NG';
    data: GetCompanyBranchData;
    client_message: string;
};