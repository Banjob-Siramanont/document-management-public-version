import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setSparePartDatas } from '../../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Helper
import { getClaimHistoryApi } from '../../../helper/api/claimHistory';
import { getAllSparePartActionsApi } from '../../../helper/api/sparePartAction';
import { getAllSparePartsFromVehicleModelApi } from '../../../helper/api/sparePart';

// Component
import TopicOfCard from '../../../common/topic/TopicOfCard';
import SelectSearch from '../../../common/select/SelectSearch';
import SelectMultiple from '../../../common/select/selectMultiple/SelectMultiple';
import InputPrimary from '../../../common/input/InputPrimary';
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';

// Type
import { GetClaimHistoryResponse } from '../../../types/helper/api/claimHistoryTypes';
import { GetAllSparePartActionData, GetAllSparePartActionDatasResponse } from '../../../types/helper/api/sparePartActionType';
import { GetAllSparePartFromVehicleModelResponse, SparePartFromVehicleModelData } from '../../../types/helper/api/sparePartTypes';

export default function SparePartList() {

    const {
        selectedClaimHistory,
        sparePartDatas,
    } = useSelector((state: RootState) => state.createWorkOrderstateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [sparePartOptionDatas, setSparePartOptionDatas] = useState<SparePartFromVehicleModelData[]>([]);
    const [sparePartActionDatas, setSparePartActionDatas] = useState<GetAllSparePartActionData[]>([]);
    const [vehicleModelId, setVehicleModelId] = useState<string>('');

    const getAllSparePartActions = async () => {
        try {
            const result: GetAllSparePartActionDatasResponse = await getAllSparePartActionsApi();
            if (result.status === 'OK') return setSparePartActionDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllSparePartsFromVehicleModel = async () => {
        try {
            const result: GetAllSparePartFromVehicleModelResponse = await getAllSparePartsFromVehicleModelApi(vehicleModelId);
            if (result.status === 'OK') setSparePartOptionDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getClaimHistory = async () => {
        try {
            const result: GetClaimHistoryResponse = await getClaimHistoryApi(selectedClaimHistory as string);

            if (result.status === 'OK') setVehicleModelId(result.data.vehicle_model_id);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedClaimHistory === '') return
        getClaimHistory();
    }, [selectedClaimHistory]);

    useEffect(() => {
        if (vehicleModelId === '') return;
        getAllSparePartsFromVehicleModel();
    }, [vehicleModelId]);

    useEffect(() => {
        getAllSparePartActions();
    }, []);


    return (
        <>
            <TopicOfCard text='รายการอะไหล่' />
            <ThreeColumnGrid>
                {sparePartDatas.map((sparePartData, index) => {
                    // Count occurrences of each spare_part_id
                    const sparePartIdCounts = sparePartDatas.reduce<Record<string, number>>((acc, item) => {
                        if (item.spare_part_id !== '') {
                            acc[item.spare_part_id] = (acc[item.spare_part_id] || 0) + 1;
                        }
                        return acc;
                    }, {});

                    // Check if the current spare_part_id is a duplicate
                    const isDuplicate = sparePartIdCounts[sparePartData.spare_part_id] > 1;

                    return (
                        <React.Fragment key={sparePartData.id}>
                            <SelectSearch
                                labelTag={`(${index + 1}) รายการอะไหล่`}
                                optionDatas={sparePartOptionDatas}
                                selectedValue={sparePartData.spare_part_id}
                                keyValue='_id'
                                keyDisplayValue='spare_part_name'
                                onChange={value => dispatch(setSparePartDatas({ index, updateKey: 'spare_part_id', value }))}
                                textHelper={isDuplicate ? 'ซ้ำกับรายการอื่น' : ''}
                            />
                            <SelectMultiple
                                label={`(${index + 1}) สิ่งที่ต้องทำ`}
                                options={sparePartActionDatas}
                                keyValue='_id'
                                keyDisplayValue='spare_part_action_name'
                                values={sparePartData.spare_part_actions}
                                onChange={value => dispatch(setSparePartDatas({ index, updateKey: 'spare_part_actions', value }))}
                            />
                            <InputPrimary
                                labelTag={`(${index + 1}) หมายเหตุ`}
                                placeholder='ไม่บังคับ'
                                type='text'
                                value={sparePartData.note}
                                onChange={event => dispatch(setSparePartDatas({ index, updateKey: 'note', value: event.target.value }))}
                            />
                        </React.Fragment>
                    );
                })}
            </ThreeColumnGrid>
        </>
    )
}
