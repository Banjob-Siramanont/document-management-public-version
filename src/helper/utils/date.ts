import moment from 'moment';

export const convertDateToThai = (value: string) => {
    const monthsThai = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() + 543;

    return `${day} ${monthsThai[month]} ${year}`;
};

export const convertTimeToThai = (value: string) => {
    moment.locale('th');

    let date;
    if (value.includes(' ')) date = moment(value, 'YYYY-MM-DD HH:mm:ss');
    else date = moment(value, 'HH:mm:ss');

    return date.format('HH:mm');
};