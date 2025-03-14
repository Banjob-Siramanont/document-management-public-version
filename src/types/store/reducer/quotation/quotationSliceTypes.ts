import { ClaimHistoryForNoQuotationData } from "../../../helper/api/claimHistoryTypes";
import { GetCompanyBranchData } from "../../../helper/api/companyBranchTypes";
import { SparePartFromVehicleModelData } from "../../../helper/api/sparePartTypes";

export type ReplacingSparePartData = {
    id: number;
    spare_part_id: string;
    price: number;
};

export type WageData = {
    id: number;
    wage: string;
    price: number;
};

export type QuotationData = {
    companyBranchOptionDatas: GetCompanyBranchData[];
    claimHistoryOptionDatas: ClaimHistoryForNoQuotationData[];
    sparePartOptionDatas: SparePartFromVehicleModelData[];
    selectedCompanyBranch: string;
    selectedClaimHistory: string;
    vehicleName: string;
    replacingSparePartDatas: ReplacingSparePartData[];
    wageDatas: WageData[];
    totalReplacingSparePartPrice: number;
    totalWagePrice: number;
    totalReplaceAndWagePrice: number;
};

export type Payload<Key extends keyof QuotationData> = {
    value: QuotationData[Key];
    variableName: Key;
};