// Helper
import { thaiTextOnly } from '../../../helper/utils/validateValue';

// Component
import SelectPrimary from '../../../common/select/SelectPrimary';
import InputPrimary from '../../../common/input/InputPrimary';
import InputDateAndTime from '../../../common/input/InputDateAndTime';
import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import { GetAllTitlesResponse, GetTitleData } from '../../../types/helper/api/titleTypes';
import { GetAllJobPositionsResponse, GetJobPositionData } from '../../../types/helper/api/jobPositionTypes';
import { useEffect, useState } from 'react';
import { getAllJobPositionsApi } from '../../../helper/api/jobPosition';
import { getAllTitlesApi } from '../../../helper/api/title';

type BasicInformationProps = {
    selectedJobPosition: string;
    setSelectedJobPosition: (value: string) => void;
    selectedTitle: string;
    setSelectedTitle: (value: string) => void;
    employeeFirstName: string;
    setEmployeeFirstName: (value: string) => void;
    employeeLastName: string;
    setEmployeeLastName: (value: string) => void;
    employeeNickName: string;
    setEmployeeNickName: (value: string) => void;
    startWorkingdate: string;
    setStartWorkingdate: (value: string) => void;
    startPaySocialSecurityDate: string;
    setStartPaySocialSecurityDate: (value: string) => void;
}
export default function BasicInformation({
    selectedJobPosition,
    setSelectedJobPosition,
    selectedTitle,
    setSelectedTitle,
    employeeFirstName,
    setEmployeeFirstName,
    employeeLastName,
    setEmployeeLastName,
    employeeNickName,
    setEmployeeNickName,
    startWorkingdate,
    setStartWorkingdate,
    startPaySocialSecurityDate,
    setStartPaySocialSecurityDate,
}: BasicInformationProps) {

    const [jobPositionOptionDatas, setJobPositionOptionDatas] = useState<GetJobPositionData[]>([]);
    const [titleOptionDatas, setTitleOptionDatas] = useState<GetTitleData[]>([]);

    const getAllJobPositions = async () => {
        try {
            const result: GetAllJobPositionsResponse = await getAllJobPositionsApi();
            if (result.status === 'OK') return setJobPositionOptionDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllJobPositions();
    }, []);

    const getAllTitles = async () => {
        try {
            const result: GetAllTitlesResponse = await getAllTitlesApi();
            if (result.status === 'OK') setTitleOptionDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllTitles();
    }, []);

    return (
        <>
            <ThreeColumnGrid>
                <SelectPrimary
                    labelTag='คำนำหน้าชื่อ'
                    optionDatas={titleOptionDatas}
                    selectedValue={selectedTitle}
                    keyValue='_id'
                    keyDisplayValue='title_abbreviation'
                    onChange={value => setSelectedTitle(value as string)}
                />
                <InputPrimary
                    type='text'
                    labelTag='ชื่อ'
                    placeholder='กรุณาระบุ'
                    value={employeeFirstName}
                    onChange={event => setEmployeeFirstName(thaiTextOnly(event.target.value))}
                />
                <InputPrimary
                    type='text'
                    labelTag='นามสกุล'
                    placeholder='กรุณาระบุ'
                    value={employeeLastName}
                    onChange={event => setEmployeeLastName(thaiTextOnly(event.target.value))}
                />
                <InputPrimary
                    type='text'
                    labelTag='ชื่อเล่น'
                    placeholder='กรุณาระบุ'
                    value={employeeNickName}
                    onChange={event => setEmployeeNickName(thaiTextOnly(event.target.value))}
                />
                <SelectPrimary
                    labelTag='ตำแหน่งงาน'
                    optionDatas={jobPositionOptionDatas}
                    selectedValue={selectedJobPosition}
                    keyValue='_id'
                    keyDisplayValue='job_position_name'
                    onChange={value => setSelectedJobPosition(value as string)}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่เริ่มงานวันแรก'
                    placeholder='กรุณาเลือก'
                    value={startWorkingdate}
                    onChange={formattedDate => setStartWorkingdate(formattedDate)}
                />
                <InputDateAndTime
                    type='date'
                    labelTag='วันที่เข้าประกันสังคม'
                    placeholder='กรุณาเลือก'
                    value={startPaySocialSecurityDate}
                    onChange={formattedDate => setStartPaySocialSecurityDate(formattedDate)}
                />
            </ThreeColumnGrid>
        </>
    )
}
