export function numberToThaiText(number: string): string {
    const thaiToArabicMap: { [key: string]: string } = {
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
        '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9'
    };

    number = number.replace(/[๐-๙]/g, char => thaiToArabicMap[char]);
    return arabicNumberToText(number);
}

function arabicNumberToText(number: string): string {
    number = checkNumber(number);

    if (isNaN(parseFloat(number))) return 'ข้อมูลนำเข้าไม่ถูกต้อง';
    if (parseFloat(number) > 9999999.9999) return 'ข้อมูลนำเข้าเกินขอบเขตที่ตั้งไว้';

    const numberArray: string[] = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ'];
    const digitArray: string[] = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
    let bahtText: string = '';

    let [integerPart, decimalPart = '00'] = number.split('.');
    decimalPart = decimalPart.substring(0, 2);

    for (let i = 0; i < integerPart.length; i++) {
        let digit = parseInt(integerPart[i]);
        let position = integerPart.length - i - 1;

        if (digit !== 0) {
            if (position === 0 && digit === 1 && integerPart.length > 1) bahtText += 'เอ็ด';
            else if (position === 1 && digit === 2) bahtText += 'ยี่';
            else if (position === 1 && digit === 1) bahtText += '';
            else bahtText += numberArray[digit];

            bahtText += digitArray[position];
        }
    }

    bahtText += 'บาท';

    if (decimalPart === '00') bahtText += 'ถ้วน';
    else {
        for (let i = 0; i < decimalPart.length; i++) {
            let digit = parseInt(decimalPart[i]);
            let position = decimalPart.length - i - 1;

            if (digit !== 0) {
                if (position === 0 && digit === 1 && decimalPart.length > 1) bahtText += 'เอ็ด';
                else if (position === 1 && digit === 2) bahtText += 'ยี่';
                else if (position === 1 && digit === 1) bahtText += '';
                else bahtText += numberArray[digit];

                bahtText += digitArray[position];
            }
        }
        bahtText += 'สตางค์';
    }

    return bahtText;
}

function checkNumber(number: string): string {
    number = number.toString().replace(/ |,|บาท|฿/gi, '');
    return number.includes('.') ? number : number + '.00';
}
