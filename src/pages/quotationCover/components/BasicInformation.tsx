import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setClaimIdDatas } from '../../../store/reducer/quotationCoverSlice/QuotationCoverSlice';

// Helper
import { GetAllClaimHistorysResponse, GetClaimHistoryData } from '../../../types/helper/api/claimHistoryTypes';
import { getAllClaimHistoriesApi } from '../../../helper/api/claimHistory';

// Component
import TwoColumnGrid from '../../../common/card/TwoColumnGrid';
import SelectSearch from '../../../common/select/SelectSearch';
import TopicOfCard from '../../../common/topic/TopicOfCard';

export default function BasicInformation() {

    const { claimIdDatas } = useSelector((state: RootState) => state.quotationCoverStateValueValue);
    const dispatch = useDispatch<AppDispatch>();

    const [claimHistoryDatas, setClaimHistoryDatas] = useState<GetClaimHistoryData[]>([]);
    const getAllClaimHistory = async () => {
        try {
            const result: GetAllClaimHistorysResponse = await getAllClaimHistoriesApi();
            if (result.status === 'OK') return setClaimHistoryDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        getAllClaimHistory();
    }, []);

    return (
        <>
            <TopicOfCard text='ข้อมูลเบื้องต้น' />
            <TwoColumnGrid>
                {claimIdDatas.map((claimIdData, index) => {
                    const claimIdCount = claimIdDatas.reduce<Record<string, number>>((acc, item) => {
                        if (item.claim_history_id !== '') {
                            acc[item.claim_history_id] = (acc[item.claim_history_id] || 0) + 1;
                        }
                        return acc;
                    }, {});

                    // Check if the current claim_history_id is a duplicate
                    const isDuplicate = claimIdCount[claimIdData.claim_history_id] > 1;
                    return (
                        <React.Fragment key={claimIdData.id}>
                            <SelectSearch
                                labelTag='เลขที่เคลม'
                                optionDatas={claimHistoryDatas}
                                selectedValue={claimIdData.claim_history_id}
                                keyValue='_id'
                                keyDisplayValue='claim_no'
                                onChange={value => dispatch(setClaimIdDatas({ index, value: value as string }))}
                                textHelper={isDuplicate ? 'ซ้ำกับรายการอื่น' : ''}
                            />
                            <SelectSearch
                                labelTag='เลขทะเบียน'
                                optionDatas={claimHistoryDatas}
                                selectedValue={claimIdData.claim_history_id}
                                keyValue='_id'
                                keyDisplayValue='license_plate'
                                onChange={value => dispatch(setClaimIdDatas({ index, value: value as string }))}
                            />
                        </React.Fragment>
                    )
                })}
            </TwoColumnGrid>
        </>
    )
}
