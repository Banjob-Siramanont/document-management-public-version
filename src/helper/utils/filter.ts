import { Option } from '../../types/store/reducer/commonTypes';


export const filteredData = (optionDatas: Option[], selectedValue: string | number, keyValue: string, keyDisplayValue: string) => {
    const filteredValue = optionDatas.filter(optionData => optionData[keyValue] === selectedValue);

    if (filteredValue?.length > 0) return filteredValue[0][keyDisplayValue]
    return 'โปรดเลือก'
};