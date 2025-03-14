import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { addReplacingSparePart, deleteReplacingSparePart, setQuotationDatas, setReplacingSparePartDatas } from '../../../store/reducer/quotationSlice/QuotationSlice';

// Helper
import { currency } from '../../../helper/utils/currency';
import { getAllSparePartsFromVehicleModelApi } from '../../../helper/api/sparePart';

// Component
import TopicOfCard from '../../../common/topic/TopicOfCard';
import HoverableButton from '../../../common/button/HoverableButton';
import InputPrimary from '../../../common/input/InputPrimary';
import SelectSearch from '../../../common/select/SelectSearch';

// Type
import { GetAllSparePartFromVehicleModelResponse } from '../../../types/helper/api/sparePartTypes';
import { GetClaimHistoryResponse } from '../../../types/helper/api/claimHistoryTypes';
import { getClaimHistoryApi } from '../../../helper/api/claimHistory';

export default function ReplacingSparePartInformation() {

    const dispatch = useDispatch<AppDispatch>();
    const {
        selectedClaimHistory,
        sparePartOptionDatas,
        replacingSparePartDatas,
        wageDatas,
    } = useSelector((state: RootState) => state.quotationStateValueValue);

    const [vehicleModelId, setVehicleModelId] = useState<string>('');

    // Calculate total price
    const totalPrice = replacingSparePartDatas.reduce((sum, item) => sum + Number(item.price), 0);
    const totalWagePrice = wageDatas.reduce((sum, item) => sum + Number(item.price), 0);

    const getAllSparePartsFromVehicleModel = async () => {
        try {
            const result: GetAllSparePartFromVehicleModelResponse = await getAllSparePartsFromVehicleModelApi(vehicleModelId);
            if (result.status === 'OK') {
                dispatch(setQuotationDatas({ value: result.data, variableName: 'sparePartOptionDatas' }))
            }
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

    return (
        <>
            <TopicOfCard text='ข้อมูลรายการเปลี่ยนอะไหล่' />
            <div className='grid grid-cols-2 gap-x-4 max-[800px]:grid-cols-1 mb-8'>
                {replacingSparePartDatas.map((replacingSparePartData, index) => {
                    const replacingSparePartCounts = replacingSparePartDatas.reduce<Record<string, number>>((acc, item) => {
                        if (item.spare_part_id !== '') {
                            acc[item.spare_part_id] = (acc[item.spare_part_id] || 0) + 1;
                        }
                        return acc;
                    }, {});

                    // Check if the current spare_part_id is a duplicate
                    const isDuplicate = replacingSparePartCounts[replacingSparePartData.spare_part_id] > 1;
                    return (
                        <React.Fragment key={replacingSparePartData.id}>
                            <SelectSearch
                                tailwindBorderClassName='border-b'
                                isBottomBorderFormat={true}
                                // labelTag={`(${index + 1}) รายการเปลี่ยนอะไหล่`}
                                optionDatas={sparePartOptionDatas}
                                selectedValue={replacingSparePartData.spare_part_id}
                                keyValue='_id'
                                keyDisplayValue='spare_part_name'
                                onChange={value => dispatch(setReplacingSparePartDatas({ index, updateKey: 'spare_part_id', value }))}
                                textHelper={isDuplicate ? 'ซ้ำกับรายการอื่น' : ''}
                            />
                            <InputPrimary
                                tailwindBorderClassName='border-b'
                                // labelTag={`(${index + 1}) ราคา`}
                                placeholder='กรุณาระบุ'
                                type='number'
                                value={replacingSparePartData.price}
                                onChange={event => dispatch(setReplacingSparePartDatas({ index, updateKey: 'price', value: event.target.value }))}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
            <div className='flex justify-between items-start -mt-6 mb-6'>
                <div className='flex justify-start items-center gap-x-2'>
                    <HoverableButton
                        text='+ เพิ่มรายการ'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => {
                            dispatch(addReplacingSparePart())
                            window.scrollTo(0, document.body.scrollHeight);
                        }}
                    />
                    <HoverableButton
                        text='- ลบรายการ'
                        textColor='text-roseRed'
                        bgColor='bg-roseRed'
                        borderColor='border-roseRed'
                        onClick={() => dispatch(deleteReplacingSparePart())}
                    />
                </div>
                <div>
                    <div className='dark:text-smoothWhite text-right'>
                        <span className='font-light'>รวมราคา รายการเปลี่ยนอะไหล่ : </span> {currency(totalPrice, 2, 2)} <span className='font-light'>บาท</span>
                    </div>
                    <div className='dark:text-smoothWhite text-right'>
                        <span className='font-light'>รวมราคา : </span> {currency(totalPrice + totalWagePrice, 2, 2)} <span className='font-light'>บาท</span>
                    </div>
                </div>
            </div>
        </>
    )
}
