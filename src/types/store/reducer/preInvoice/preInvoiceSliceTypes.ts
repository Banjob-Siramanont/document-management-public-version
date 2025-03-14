export type ClaimNoAndTotalPriceData = {
    id: string | number;
    claimNo: string;
    totalPrice: number;
};

export type PreInvoiceData = {
    selectedCompanyBranch: string;
    claimNoAndTotalPriceDatas: ClaimNoAndTotalPriceData[];
};

export type Payload<Key extends keyof PreInvoiceData> = {
    value: PreInvoiceData[Key];
    variableName: Key;
}