import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

type InputDateAndTimeProps = {
    className?: string;
    labelTag?: string;
    type: 'date' | 'time';
    placeholder?: string;
    value: string;
    onChange: (date: string) => void;
    textHelper?: string;
};

export default function InputDateAndTime({ className, labelTag, type, placeholder, value, onChange, textHelper }: InputDateAndTimeProps) {

    const [selectedDate, setSelectedDate] = useState<Date | string>('');

    const handleDateAndTimeOnChange = (date: Date) => {
        const format = type === 'date' ? 'YYYY-MM-DD' : 'HH:mm';
        const formatted = moment(date).format(format);

        onChange(formatted === 'Invalid date' ? '' : formatted);
    };

    useEffect(() => {
        if (value === '') setSelectedDate('');
        else if (type === 'date') setSelectedDate(new Date(value));
        else if (type === 'time') {
            const [hours, minutes] = value.split(':');
            const selectTime = new Date();
            selectTime.setHours(Number(hours));
            selectTime.setMinutes(Number(minutes));
            selectTime.setSeconds(0);
            selectTime.setMilliseconds(0);
            setSelectedDate(selectTime);
        }
    }, [value]);

    return (
        <div className={className}>
            <div className='grid grid-cols-1 border border-inputColor rounded-[4px] px-3 py-[7px] bg-white dark:bg-intenseFadeBlack text-[14px] dark:text-smoothWhite font-light'>
                <div className='text-inputText dark:text-inputTextDark'>{labelTag}</div>
                <DatePicker
                    placeholderText={placeholder}
                    selected={selectedDate as Date}
                    onChange={date => handleDateAndTimeOnChange(date as Date)}
                    dateFormat={type === 'date' ? 'dd/MM/yyyy' : 'HH:mm'}
                    timeFormat='HH:mm'
                    showTimeSelect={type === 'time'}
                    showTimeSelectOnly={type === 'time'}
                    className='w-full dark:text-smoothWhite focus:outline-none py-1'
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={100} // Show 100 years in dropdown
                    scrollableYearDropdown
                    minDate={new Date(1901, 0, 1)} // Set earliest selectable date
                    withPortal={type === 'date' ? true : false}
                    customInput={<input inputMode='none' />} // ยกเลิก keyboard pop up ตอนที่เลือก type date ในมือถือ
                // minDate={new Date()} // comment ออกไปก่อนเพราะว่ามีปัญหาตอนที่เลือกวันเกิดย้อนหลังไม่ได้
                // minTime={isToday ? currentTime : new Date().setHours(0, 0)}
                // maxTime={new Date().setHours(23, 59)}
                />

            </div>
            <div className='text-alarmRed dark:text-alarmYellow text-[12px]'>
                {textHelper}
            </div>
        </div>
    )
}
