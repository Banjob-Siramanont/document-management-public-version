export type ClaimIdData = {
    claim_no: string;
    license_plate: string;
};

export type GetQuotationCoverForPrintResponse = {
    status: 'OK' | 'NG';
    data: ClaimIdData[];
    client_message: string;
};