import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { setCreateWorkOrderDatas } from '../../../store/reducer/workOrderSlice/CreateWorkOrderSlice';

// Helper
import { getAllEmployeeApi } from '../../../helper/api/employee';

// Component
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import SelectPrimary from '../../../common/select/SelectPrimary';
import TopicOfCard from '../../../common/topic/TopicOfCard';
import InputDateAndTime from '../../../common/input/InputDateAndTime';

// Type
import { GetAllEmployeesResponse, GetEmployeeData } from '../../../types/helper/api/employeeTypes';

export default function ReparingInformation() {

    const {
        mechanicId,
        reparingDate,
        finishReparingDate,
    } = useSelector((state: RootState) => state.createWorkOrderstateValue);

    const dispatch = useDispatch<AppDispatch>();
    const [employeeDatas, setEmployeeDatas] = useState<GetEmployeeData[]>([]);

    const getAllEmployees = async () => {
        try {
            const result: GetAllEmployeesResponse = await getAllEmployeeApi(); // ตอนแรกจะกรองข้อมูลเอามาแค่ตำแหน่ง "ช่างซ่อม" แต่เปลี่ยนใจเอามาทั้งหมด เพราะเผื่อมีกรณีที่น้าวรรณเป็นค้นซ่อม จะได้เลือกว่าน้าวรรณเป็นคนซ่อมได้
            if (result.status === 'OK') return setEmployeeDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    return (
        <>
            <TopicOfCard text='ข้อมูลการซ่อม' />
            <ThreeColumnGrid>
                <SelectPrimary
                    labelTag='ผู้ทำการซ่อม'
                    optionDatas={employeeDatas}
                    selectedValue={mechanicId}
                    keyValue='_id'
                    keyDisplayValue='employee_full_name'
                    onChange={value => dispatch(setCreateWorkOrderDatas({ value: value as string, variableName: 'mechanicId' }))}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่เข้าซ่อม'
                    placeholder='กรุณาเลือกวันที่'
                    value={reparingDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'reparingDate' }))}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่ซ่อมเสร็จ'
                    placeholder='กรุณาเลือกวันที่'
                    value={finishReparingDate}
                    onChange={formattedDate => dispatch(setCreateWorkOrderDatas({ value: formattedDate, variableName: 'finishReparingDate' }))}
                />
            </ThreeColumnGrid>
        </>
    )
}
