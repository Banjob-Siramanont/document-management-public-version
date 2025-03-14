export type GetClaimHistoryData = {
    no: number;
    _id: string;
    claim_date: string;
    vehicle_brand_eng_name: string;
    vehicle_model_eng_name: string;
    license_plate: string;
    sender: string;
    insurance_company_short_name: string;
    vehicle_color_name: string;
    claim_no: string;
    ex_save: string;
    remuneration: string;
    finish_reparing_date: string;
    customer_permanently_take_vehicle_back_date: string;
    work_order_create_date: string;
    pre_invoice_create_date: string;
    quotation_create_date: string;
    receipt_create_date: string;
};

export type GetAllClaimHistorysResponse = {
    status: 'OK' | 'NG';
    data: GetClaimHistoryData[];
    client_message: string;
};

export type PostClaimHistoryData = {
    claim_date: string;
    vehicle_brand_id: string;
    vehicle_model_id: string;
    license_plate: string;
    sender: string;
    insurance_company_id: string;
    claim_no: string;
    ex_save: number;
    finish_reparing_date: string;
    customer_permanently_take_vehicle_back_date: string;
    vehicle_color_id: string;
    quotation_id: string;
    pre_invoice_id: string;
    work_order_id: string;
    receipt_create_date: string;
    claim_History_status: string;
    _id: string;
    claim_History_create_date: string;
    __v: number;
};

export type PostClaimHistoryResponse = {
    status: 'OK' | 'NG';
    data: PostClaimHistoryData;
    client_message: string;
};

export type GetOneClaimHistoryData = {
    _id: string;
    claim_date: string;
    vehicle_brand_id: string;
    vehicle_model_id: string;
    license_plate: string;
    sender: string;
    insurance_company_id: string;
    claim_no: string;
    ex_save: number;
    remuneration: number;
    finish_reparing_date: string;
    customer_permanently_take_vehicle_back_date: string;
    receipt_create_date: string;
    vehicle_color_id: string;
};

export type GetClaimHistoryResponse = {
    status: 'OK' | 'NG';
    data: GetOneClaimHistoryData;
    client_message: string;
};

export type ClaimHistoryForNoQuotationData = {
    _id: string;
    license_plate: string;
    claim_no: string;
};

export type GetClaimHistoryForNoQuotationResponse = {
    status: 'OK' | 'NG';
    data: ClaimHistoryForNoQuotationData[];
    client_message: string;
};

export type ClaimHistoryForNoPreInvoiceData = {
    _id: string;
    license_plate: string;
    claim_no: string;
};

export type GetClaimHistoryForNoPreInvoiceResponse = {
    status: 'OK' | 'NG';
    data: ClaimHistoryForNoPreInvoiceData[];
    client_message: string;
};

export type ClaimHistoryForNoWorkOrderData = {
    _id: string;
    claim_no: string;
};

export type GetClaimHistoryForNoWorkOrderResponse = {
    status: 'OK' | 'NG';
    data: ClaimHistoryForNoWorkOrderData[];
    client_message: string;
};