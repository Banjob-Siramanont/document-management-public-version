import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { addWage, deleteWage, setWageDatas } from '../../../store/reducer/quotationSlice/QuotationSlice';

// helper
import { currency } from '../../../helper/utils/currency';

// Component
import TopicOfCard from '../../../common/topic/TopicOfCard';
import InputPrimary from '../../../common/input/InputPrimary';
import TwoColumnGrid from '../../../common/card/TwoColumnGrid';
import HoverableButton from '../../../common/button/HoverableButton';

export default function WageInformation() {

    const { wageDatas } = useSelector((state: RootState) => state.quotationStateValueValue);

    const dispatch = useDispatch<AppDispatch>();

    // Calculate total price
    const totalPrice = wageDatas.reduce((sum, item) => sum + Number(item.price), 0);

    return (
        <>
            <TopicOfCard text='ข้อมูลรายการซ่อม / เคาะพ่นสี' />
            <TwoColumnGrid>
                {wageDatas.map((wageData, index) => (
                    <React.Fragment key={wageData.id}>
                        <InputPrimary
                            labelTag={`(${index + 1}) รายการซ่อม / เคาะพ่นสี`}
                            placeholder='กรุณาระบุ'
                            type='text'
                            value={wageData.wage}
                            onChange={event => dispatch(setWageDatas({ index, updateKey: 'wage', value: event.target.value }))}
                        />
                        <InputPrimary
                            labelTag={`(${index + 1}) ราคา`}
                            placeholder='กรุณาระบุ'
                            type='number'
                            value={wageData.price}
                            onChange={event => dispatch(setWageDatas({ index, updateKey: 'price', value: event.target.value }))}
                        />
                    </React.Fragment>
                ))}
            </TwoColumnGrid>
            <div className='flex justify-between items-start -mt-6 mb-6'>
                <div className='flex justify-start items-center gap-x-2'>
                    <HoverableButton
                        text='+ เพิ่มรายการ'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => dispatch(addWage())}
                    />
                    <HoverableButton
                        text='- ลบรายการ'
                        textColor='text-roseRed'
                        bgColor='bg-roseRed'
                        borderColor='border-roseRed'
                        onClick={() => dispatch(deleteWage())}
                    />
                </div>
                <div className='dark:text-smoothWhite text-right'>
                    <span className='font-light'>รวมราคา รายการซ่อม / เคาะพ่นสี : </span> {currency(totalPrice, 2, 2)} <span className='font-light'>บาท</span>
                </div>
            </div>
        </>
    )
}
