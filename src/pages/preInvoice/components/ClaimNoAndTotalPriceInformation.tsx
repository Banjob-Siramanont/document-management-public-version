import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setClaimNoAndTotalPriceDatas } from '../../../store/reducer/preInvoiceSlice/PreInvoiceSlice';

// Helper
import { numericWithoutText } from '../../../helper/utils/validateValue';
import { getAllClaimHistoryForNoPreInvoiceApi } from '../../../helper/api/claimHistory';

// Component
import SelectSearch from '../../../common/select/SelectSearch';
import InputPrimary from '../../../common/input/InputPrimary';

// Types
import { ClaimHistoryForNoPreInvoiceData, GetClaimHistoryForNoPreInvoiceResponse } from '../../../types/helper/api/claimHistoryTypes';

export default function ClaimNoAndTotalPriceInformation({ isEditMode = false }: { isEditMode?: boolean; }) {

    const { claimNoAndTotalPriceDatas } = useSelector((state: RootState) => state.preInvoiceDataStateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [claimHistoryDatas, setClaimHistoryDatas] = useState<ClaimHistoryForNoPreInvoiceData[]>([]);

    const getAllClaimHistoryForNoPreInvoice = async () => {
        try {
            const result: GetClaimHistoryForNoPreInvoiceResponse = await getAllClaimHistoryForNoPreInvoiceApi();
            if (result.status === 'OK') setClaimHistoryDatas(result.data)
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEditMode) return
        getAllClaimHistoryForNoPreInvoice();
    }, []);

    return (
        <>
            {claimNoAndTotalPriceDatas.map((claimNoAndTotalPriceData, index) => {
                const claimIdCounts = claimNoAndTotalPriceDatas.reduce<Record<string, number>>((acc, item) => {
                    if (item.claimNo !== '') {
                        acc[item.claimNo] = (acc[item.claimNo] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Check if the current claimNo is a duplicate
                const isDuplicate = claimIdCounts[claimNoAndTotalPriceData.claimNo] > 1;
                return (
                    <React.Fragment key={claimNoAndTotalPriceData.id}>
                        {!isEditMode && (
                            <>
                                <SelectSearch
                                    labelTag={`(${index + 1}) เลขที่เคลม`}
                                    optionDatas={claimHistoryDatas}
                                    selectedValue={claimNoAndTotalPriceData.claimNo}
                                    keyValue='_id'
                                    keyDisplayValue='claim_no'
                                    onChange={value => dispatch(setClaimNoAndTotalPriceDatas({ index, updateKey: 'claimNo', value }))}
                                    textHelper={isDuplicate ? 'ซ้ำกับรายการอื่น' : ''}
                                />
                                <SelectSearch
                                    labelTag={`(${index + 1}) เลขทะเบียน`}
                                    optionDatas={claimHistoryDatas}
                                    selectedValue={claimNoAndTotalPriceData.claimNo}
                                    keyValue='_id'
                                    keyDisplayValue='license_plate'
                                    onChange={value => dispatch(setClaimNoAndTotalPriceDatas({ index, updateKey: 'claimNo', value }))}
                                    textHelper={isDuplicate ? 'ซ้ำกับรายการอื่น' : ''}
                                />
                            </>
                        )}
                        <InputPrimary
                            labelTag={`จำนวนเงินรวมทั้งสิ้น ${index + 1}`}
                            placeholder='กรุณาระบุ'
                            type='number'
                            value={claimNoAndTotalPriceData.totalPrice}
                            onChange={event => dispatch(setClaimNoAndTotalPriceDatas({ index, updateKey: 'totalPrice', value: numericWithoutText(event.target.value) }))}
                        />
                    </React.Fragment>
                )
            })}
        </>
    )
}
