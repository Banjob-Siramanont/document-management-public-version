import React, { useEffect, useState } from 'react';

// Helper
import { currency } from '../../helper/utils/currency';
import { numberToThaiText } from '../../helper/utils/thaiBaht';
import { getReceiptForPrintApi } from '../../helper/api/receipt';

// Component
import PrintButton from '../components/PrintButton';

// css
import styles from '../../common/table/Table.module.css';

// Type
import { GetReceiptForPrintData, GetReceiptForPrintResponse } from '../../types/helper/api/receiptTypes';
import Loading from '../../components/Loading';

const PRINT_IT_TWICE = [0, 1];

export default function PrintReceipt() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [receiptForPrintDatas, setReceiptForPrintDatas] = useState<GetReceiptForPrintData>({
        no: 1,
        _id: '',
        company_branch_name: '',
        company_branch_address: '',
        receipt_no: '',
        insurance_company_name: '',
        insurance_company_short_name: '',
        insurance_company_address: '',
        receipt_detail: '',
        receipt_sub_detail: '',
        receipt_total_price: 0,
        receipt_create_date: '',
        company_name: '',
        company_tax_id: '',
        company_tel: '',
        company_email: ','
    });

    const getAllReceipts = async () => {
        setIsLoading(true);
        try {
            const result: GetReceiptForPrintResponse = await getReceiptForPrintApi(id as string);
            if (result.status === 'OK') return setReceiptForPrintDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllReceipts();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <PrintButton text='ปริ้นใบเสร็จ' />
            <div id='print-area' className='font-sans w-[21cm] h-full bg-white px-5'>
                {PRINT_IT_TWICE.map((printItTwice, index) => (
                    <React.Fragment key={printItTwice}>
                        <Header receiptForPrintDatas={receiptForPrintDatas} index={index} />
                        <Table receiptForPrintDatas={receiptForPrintDatas} />
                        <Footer />
                        <div className='break-after-page'></div>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

type InformationDetailProps = {
    topic: string;
    detail: string;
}

function InformationDetail({ topic, detail }: InformationDetailProps) {
    return (
        <div className='grid grid-cols-[auto_1fr] gap-x-1'>
            <div>{topic} :</div>
            <div className='text-left'>{detail}</div>
        </div>
    )
}

type HeaderProps = {
    receiptForPrintDatas: GetReceiptForPrintData;
    index: number;
}

function Header({ receiptForPrintDatas, index }: HeaderProps) {
    return (
        <>
            <div className='mb-2 font-bold text-[30px] text-center mt-10'>{receiptForPrintDatas.company_name}</div>
            <div className='text-center'>{receiptForPrintDatas.company_branch_name} : {receiptForPrintDatas.company_branch_address}</div>

            <div className='flex justify-center items-center gap-x-5 mb-6'>
                <InformationDetail topic='เลขประจำตัวผู้เสียภาษีอากร' detail={receiptForPrintDatas.company_tax_id} />
                <InformationDetail topic='โทร' detail={receiptForPrintDatas.company_tel} />
                <InformationDetail topic='Email' detail={receiptForPrintDatas.company_email} />
            </div>

            <div className='grid grid-cols-[1fr_auto] gap-x-1'>
                <div className='text-right'>บิลเลขที่ :</div>
                <div>{receiptForPrintDatas.receipt_no}</div>
                <div className='text-right'>วันที่ :</div>
                <div>{receiptForPrintDatas.receipt_create_date}</div>
            </div>

            <div className='mb-2 font-bold text-[30px] text-center'>{index === 0 ? 'สำเนา' : 'ต้นฉบับ'}</div>
            <div className='grid grid-cols-[auto_1fr] gap-x-3 mb-4'>
                <div className='font-bold'>ชื่อลูกค้า</div>
                <div>{receiptForPrintDatas.insurance_company_name}</div>
                <div className='font-bold'>ที่อยู่</div>
                <div>{receiptForPrintDatas.insurance_company_address}</div>
            </div>
        </>
    )
}

function Table({ receiptForPrintDatas }: { receiptForPrintDatas: GetReceiptForPrintData }) {
    const priceBeforeTax = receiptForPrintDatas.receipt_total_price / 1.07;
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className='text-center border w-[80px]'>ลำดับ</th>
                    <th className='text-center border'>รายการ</th>
                    <th className='text-center border w-[150px]'>จำนวนเงิน</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border text-center'>1</td>
                    <td className='border pl-2'>{receiptForPrintDatas.receipt_detail}</td>
                    <td className='border text-right pr-2'>{currency(receiptForPrintDatas.receipt_total_price, 2, 2)}</td>
                </tr>
                <tr>
                    <td className='border border-black text-white'>-</td>
                    <td className='border pl-2'>{receiptForPrintDatas.receipt_sub_detail}</td>
                    <td className='border'></td>
                </tr>
                <tr>
                    <td className='border border-black text-white'>-</td>
                    <td className='border'></td>
                    <td className='border'></td>
                </tr>
                <tr>
                    <td className='border border-black text-white'>-</td>
                    <td className='border'></td>
                    <td className='border'></td>
                </tr>
                <tr>
                    <td></td>
                    <td className='text-right pr-2'>ราคาทั้งสิ้น</td>
                    <td className='border text-right pr-2'>{currency(priceBeforeTax, 2, 2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td className='text-right pr-2'>ภาษีมูลค่าเพิ่ม 7%</td>
                    <td className='border text-right pr-2'>{currency(receiptForPrintDatas.receipt_total_price - priceBeforeTax, 2, 2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td className='flex justify-between items-center'>
                        <div>( {numberToThaiText(currency(receiptForPrintDatas.receipt_total_price, 2, 2))} )</div>
                        <div className='text-right pr-2'>จำนวนเงินรวมทั้งสิ้น</div>
                    </td>
                    <td className='border text-right pr-2'>{currency(receiptForPrintDatas.receipt_total_price, 2, 2)}</td>
                </tr>
            </tbody>
        </table>
    )
};

function Footer() {
    return (
        <div className='flex justify-between items-center mt-15 px-8'>
            <div>ผู้รับเงิน_______________________</div>
            <div>ผู้มีอำนาจลงนาม_______________________</div>
        </div>
    )
}