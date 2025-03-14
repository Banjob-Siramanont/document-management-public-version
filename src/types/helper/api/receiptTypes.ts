export type GetReceiptData = {
    no: number;
    _id: string;
    company_branch_name: string;
    company_branch_address: string;
    receipt_no: string;
    insurance_company_name: string;
    insurance_company_address: string;
    receipt_detail: string;
    receipt_sub_detail: string;
    receipt_total_price: number;
    receipt_create_date: string;
};

export type GetAllReceiptsResponse = {
    status: 'OK' | 'NG';
    data: GetReceiptData[];
    client_message: string;
};

export type GetReceiptForPrintData = {
    no: number;
    _id: string;
    company_branch_name: string;
    company_branch_address: string;
    receipt_no: string;
    insurance_company_name: string;
    insurance_company_short_name: string;
    insurance_company_address: string;
    receipt_detail: string;
    receipt_sub_detail: string;
    receipt_total_price: number;
    receipt_create_date: string;
    company_name: string;
    company_tax_id: string;
    company_tel: string;
    company_email: string;
};

export type GetReceiptForPrintResponse = {
    status: 'OK' | 'NG';
    data: GetReceiptForPrintData;
    client_message: string;
};

export type GetReceiptForEditData = {
    _id: string;
    company_branch: string;
    receipt_no: string;
    insurance_company: string;
    receipt_detail: string;
    receipt_sub_detail: string;
    receipt_total_price: number;
};

export type GetReceiptForEditResponse = {
    status: 'OK' | 'NG';
    data: GetReceiptForEditData;
    client_message: string;
};

export type PostReceiptData = {
    _id: string;
    company_branch: string;
    receipt_no: string;
    insurance_company: string;
    receipt_detail: string;
    receipt_sub_detail: string;
    receipt_total_price: number;
    receipt_status: string;
    receipt_create_date: string;
    __v: number;
};

export type PostReceiptResponse = {
    status: 'OK' | 'NG';
    data: PostReceiptData;
    client_message: string;
};