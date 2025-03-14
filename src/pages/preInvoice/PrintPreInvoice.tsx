import { useEffect, useState } from 'react';
import moment from 'moment';

// Helper
import { getPreInvoiceForPrintApi } from '../../helper/api/preInvoice';
import { getCompanyDataApi } from '../../helper/api/company';
import { convertDateToThai } from '../../helper/utils/date';
import { numberToThaiText } from '../../helper/utils/thaiBaht';
import { currency } from '../../helper/utils/currency';

// Component
import InputDateAndTime from '../../common/input/InputDateAndTime';
import CardPrimary from '../../common/card/CardPrimary';
import TopicOfCard from '../../common/topic/TopicOfCard';
import HoverableButton from '../../common/button/HoverableButton';
import PrintButton from '../components/PrintButton';
import InputPrimary from '../../common/input/InputPrimary';
import TwoColumnGrid from '../../common/card/TwoColumnGrid';

// css
import styles from '../../common/table/Table.module.css';

// Type
import { GetAllPreInvoiceData, GetAllPreInvoiceDatasResponse } from '../../types/helper/api/preInvoiceType';
import { GetCompanyData, GetCompanyDataResponse } from '../../types/helper/api/companyTypes';
import Loading from '../../components/Loading';

export default function PrintPreInvoice() {

    const [printDate, setPrintDate] = useState<string>(moment(new Date).format('YYYY-MM-DD'));
    const [receiverName, setReceiverName] = useState<string>('โรสิตตา');
    const [preInvoiceDatas, setPreInvoiceDatas] = useState<GetAllPreInvoiceData[]>([]);
    const [companyData, setCompanyData] = useState<GetCompanyData>({
        _id: '',
        company_name: '',
        company_tax_id: '',
        company_tel: '',
        company_email: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const getPreInvoiceForPrint = async () => {
        setIsLoading(true);
        try {
            const result: GetAllPreInvoiceDatasResponse = await getPreInvoiceForPrintApi(printDate);
            if (result.status === 'OK') setPreInvoiceDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const getCompanyData = async () => {
        try {
            const result: GetCompanyDataResponse = await getCompanyDataApi();
            if (result.status === 'OK') setCompanyData(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCompanyData();
        getPreInvoiceForPrint();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <CardPrimary>
                <TopicOfCard text='ข้อมูลสำหรับปริ้นใบแจ้งหนี้' />
                <TwoColumnGrid>
                    <InputDateAndTime
                        labelTag='วันที่ต้องการปริ้น'
                        placeholder='กรุณาเลือกวันที่'
                        type='date'
                        value={printDate}
                        onChange={formattedDate => setPrintDate(formattedDate)}
                    />
                    <InputPrimary
                        labelTag='ผู้รับเงิน'
                        placeholder='กรุณาระบุ'
                        type='text'
                        value={receiverName}
                        onChange={event => setReceiverName(event.target.value)}
                    />
                </TwoColumnGrid>
                <div className='flex justify-end items-center'>
                    <HoverableButton
                        text='สร้างใบแจ้งหนี้'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => getPreInvoiceForPrint()}
                    />
                </div>
            </CardPrimary>

            <PrintButton text='ปริ้นใบแจ้งหนี้' />

            <div id='print-area' className='font-sans w-[21cm] h-full grid grid-cols-1 gap-y-5'>
                {preInvoiceDatas.map(preInvoiceData => (
                    <div key={preInvoiceData.claim_no} className='print-page h-[29.7cm] bg-white px-5'>
                        <Header companyData={companyData} preInvoiceData={preInvoiceData} />
                        <Body preInvoiceData={preInvoiceData} printDate={printDate} />
                        <Table preInvoiceData={preInvoiceData} />
                        <Footer preInvoiceData={preInvoiceData} receiverName={receiverName} />
                        <div className='break-after-page'></div>
                    </div>
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
    companyData: GetCompanyData;
    preInvoiceData: GetAllPreInvoiceData;
}
function Header({ companyData, preInvoiceData }: HeaderProps) {
    return (
        <>
            <div className='mb-2 font-bold text-[30px] text-center'>{companyData.company_name}</div>
            <div className='text-center'>{preInvoiceData.company_branch_name} : {preInvoiceData.company_branch_address}</div>

            <div className='flex justify-center items-center gap-x-5 mb-2'>
                <InformationDetail topic='เลขประจำตัวผู้เสียภาษีอากร' detail={companyData.company_tax_id} />
                <InformationDetail topic='โทร' detail={companyData.company_tel} />
                <InformationDetail topic='Email' detail={companyData.company_email} />
            </div>
        </>
    )
}

type BodyProps = {
    preInvoiceData: GetAllPreInvoiceData;
    printDate: string;
};

function Body({ preInvoiceData, printDate }: BodyProps) {
    return (
        <>
            <div className='mb-2 font-bold text-[30px] text-center'>ใบแจ้งหนี้</div>
            <div className='text-right'>วันที่ : {convertDateToThai(printDate)}</div>
            <div className='grid grid-cols-[auto_1fr] gap-x-3 mb-2'>
                <div className='font-bold'>ชื่อลูกค้า</div>
                <div>{preInvoiceData.insurance_company_name}</div>
                <div className='font-bold'>ที่อยู่</div>
                <div>{preInvoiceData.insurance_company_address}</div>
            </div>
        </>
    )
}

type TableProps = {
    preInvoiceData: GetAllPreInvoiceData;
};

function Table({ preInvoiceData }: TableProps) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className='text-center border'>ลำดับ</th>
                    <th className='text-center border'>เลขที่เคลม</th>
                    <th className='text-center border'>ทะเบียนรถ</th>
                    <th className='text-center border'>ยี่ห้อ</th>
                    <th className='text-center border'>จำนวนเงิน</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='text-md border text-center'>1</td>
                    <td className='text-md border text-center'>{preInvoiceData.claim_no}</td>
                    <td className='text-md border text-center'>{preInvoiceData.license_plate}</td>
                    <td className='text-md border text-center'>{preInvoiceData.vehicle_brand_eng_name}</td>
                    <td className='text-md border text-right pr-2'>{currency(preInvoiceData.pre_invoice_total_price as number, 2, 2)}</td>
                </tr>
            </tbody>
        </table>
    )
};

type FooterProps = {
    preInvoiceData: GetAllPreInvoiceData;
    receiverName: string;
};

function Footer({ preInvoiceData, receiverName }: FooterProps) {
    const totalPrice = currency(preInvoiceData.pre_invoice_total_price as number, 2, 2);
    const priceBeforeTax = (preInvoiceData.pre_invoice_total_price as number) / 1.07;
    return (
        <>
            <div className='grid grid-cols-[1fr_auto] gap-x-10 text-right my-2'>
                <div>รวมทั้งสิ้น</div>
                <div className='pr-2'>{currency(priceBeforeTax, 2, 2)}</div>
                <div>ภาษีมูลค่าเพิ่ม 7%</div>
                <div className='pr-2'>{currency((preInvoiceData.pre_invoice_total_price as number) - priceBeforeTax, 2, 2)}</div>
                <div>จำนวนเงินรวมทั้งสิ้น</div>
                <div className='pr-2'>{totalPrice}</div>
            </div>
            <div className='pr-2 text-right'>({numberToThaiText(totalPrice)})</div>
            <div className='pr-2 text-right'>ผู้รับ: {receiverName}</div>
        </>
    )
}