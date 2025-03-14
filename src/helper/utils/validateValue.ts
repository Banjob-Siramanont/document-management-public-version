export const thaiTextOnly = (text: string) => {
    const thaiRegex = /[^ก-ฮโเแ็ไำะาิีึืุูฤฦัๅ่้๊๋์ใ]/g;
    return text.replace(thaiRegex, '');
};

export const thaiTextWithNumeric = (text: string) => {
    const thaiNumericRegex = /[^ก-ฮโเแ็ไำะาิีึืุูฤฦัๅ่้๊๋์ใ0-9]/g;
    return text.replace(thaiNumericRegex, '');
};

export const textWithoutNumeric = (text: string) => {
    const textWithoutNumeric = /\d/g;
    return text.replace(textWithoutNumeric, '');
};

export const numericWithoutText = (value: string) => {
    const numeric = /\D/g;
    return value.replace(numeric, '');
};

export const textOnly = (text: string) => {
    const regex = /[a-z\u0E00-\u0E7F]/ig;
    return text.match(regex)?.join('') || '';
};

export const isEmailFormat = (value: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value.match(validRegex)) return true;
    return false;
};

export const englishOnly = (text: string) => {
    const englishRegex = /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/g;
    return text.replace(englishRegex, '');
};

// Ensure receiptNo follows the format
export const isValidateReceiptNo = (receiptNo: string): boolean => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    const receiptNoPattern = new RegExp(`^IV${currentYear}${currentMonth}[0-9]{3}$`);

    return receiptNoPattern.test(receiptNo);
};