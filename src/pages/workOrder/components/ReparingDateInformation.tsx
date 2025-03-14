import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setCreateWorkOrderDatas } from '../../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Component
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputDateAndTime from '../../../common/input/InputDateAndTime';
import TopicOfCard from '../../../common/topic/TopicOfCard';

export default function ReparingDateInformation() {

    const {
        parkingDate,
        temporaryTakingVehicleBackDate,
        drivingDate,
        takingDate,
    } = useSelector((state: RootState) => state.createWorkOrderstateValue);

    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <TopicOfCard text='ข้อมูลการนำรถเข้าซ่อม' />
            <ThreeColumnGrid>
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่เข้าจอด'
                    placeholder='กรุณาเลือกวันที่'
                    value={parkingDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'parkingDate' }))}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่เข้าเบิก'
                    placeholder='กรุณาเลือกวันที่'
                    value={temporaryTakingVehicleBackDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'temporaryTakingVehicleBackDate' }))}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่ไปขับรถมา'
                    placeholder='กรุณาเลือกวันที่'
                    value={drivingDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'drivingDate' }))}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่ยกเข้า'
                    placeholder='กรุณาเลือกวันที่'
                    value={takingDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'takingDate' }))}
                />
            </ThreeColumnGrid>
        </>
    )
}
