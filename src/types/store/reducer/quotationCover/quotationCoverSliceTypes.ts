export type ClaimIdData = {
    id: number;
    claim_history_id: string;
};

export type QuotationCoverData = {
    claimIdDatas: ClaimIdData[];
};

export type Payload<Key extends keyof QuotationCoverData> = {
    value: QuotationCoverData[Key];
    variableName: Key;
};