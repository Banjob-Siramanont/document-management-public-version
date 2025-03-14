export type WageData = {
    id: number;
    wage: string;
    price: number;
};

export type ReplacingSparePartData = {
    id: number;
    spare_part_id: string;
    spare_part_name: string;
    price: number;
};

export type QuotationData = {
    no: number;
    _id: string;
    vehicle_name: string;
    company_branch_name: string;
    company_branch_address: string;
    insurance_company_name: string;
    insurance_company_address: string;
    license_plate: string;
    claim_no: string;
    quotation_create_date: string;
    total_wage_price: number | string;
    total_replacing_spare_part_price: number | string;
    total_price: number | string;
    wage_datas: WageData[];
    replacing_spare_part_datas: ReplacingSparePartData[];
};

export type GetAllQuotationDatasResponse = {
    status: 'OK' | 'NG';
    data: QuotationData[];
    client_message: string;
};

export type GetQuotationDataResponse = {
    status: 'OK' | 'NG';
    data: QuotationData;
    client_message: string;
};

export type QuotationDataForPrint = {
    company_name: string;
    company_tax_id: string;
    company_tel: string;
    company_email: string;
    no: number;
    _id: string;
    vehicle_name: string;
    company_branch_name: string;
    company_branch_address: string;
    insurance_company_short_name: string;
    insurance_company_name: string;
    insurance_company_address: string;
    license_plate: string;
    claim_no: string;
    quotation_create_date: string;
    total_wage_price: number;
    total_replacing_spare_part_price: number;
    total_price: number;
    wage_datas: WageData[];
    replacing_spare_part_datas: ReplacingSparePartData[];
};

export type GetQuotationForPrintResponse = {
    status: 'OK' | 'NG';
    data: QuotationDataForPrint;
    client_message: string;
};

export type EditQuotationData = {
    _id: string;
    company_branch_id: string
    claim_history_id: string;
    vehicle_name: string;
    wage_datas: WageData[];
    replacing_spare_part_datas: ReplacingSparePartData[];
};

export type GetQuotationForEditResponse = {
    status: 'OK' | 'NG';
    data: EditQuotationData;
    client_message: string;
};