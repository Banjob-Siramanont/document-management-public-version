export type ReceiptData = {
    selectedCompanyBranch: string;
    receiptNo: string;
    insuranceCompany: string;
    detail: string;
    subDetail: string
    totalPrice: number;
};

export type Payload<Key extends keyof ReceiptData> = {
    value: ReceiptData[Key];
    variableName: Key;
};