export type GetAllPreInvoiceData = {
    no: number;
    _id: string;
    company_branch_name: string;
    company_branch_address: string;
    insurance_company_name: string;
    insurance_company_short_name: string;
    insurance_company_address: string;
    license_plate: string;
    vehicle_brand_eng_name: string;
    claim_no: string;
    pre_invoice_total_price: string | number;
    pre_invoice_create_date: string;
};

export type GetAllPreInvoiceDatasResponse = {
    status: 'OK' | 'NG';
    data: GetAllPreInvoiceData[];
    client_message: string;
};

export type PostPreInvoiceData = {
    _id: string;
    company_branch_id: string;
    claim_history_id: string;
    pre_invoice_total_price: number;
    pre_invoice_status: string;
    pre_invoice_create_date: string;
    __v: number;
};

export type PostPreInvoiceResponse = {
    status: 'OK' | 'NG';
    data: PostPreInvoiceData;
    client_message: string;
};

export type GetPreInvoiceDataResponse = {
    status: 'OK' | 'NG';
    data: PostPreInvoiceData; // หน้าตา data เหมือนกัน เลยเอาของ POST มาใช้
    client_message: string;
};

export type InvoiceData = {
    claim_no: string;
    ex_save: string;
    license_plate: string;
    pre_invoice_total_price: number;
    vehicle_brand_eng_name: string;
};

export type GetInvoiceForPrintResponse = {
    status: 'OK' | 'NG';
    data: InvoiceData[];
    client_message: string;
};