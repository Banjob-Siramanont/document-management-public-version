import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

// Helper
// import { numberToThaiText } from '../../helper/utils/thaiBaht';
// import { convertDateToThai } from '../../helper/utils/date';
import { currency } from '../../helper/utils/currency';

// Component
import InputDateAndTime from '../../common/input/InputDateAndTime';
// import InputPrimary from '../../common/input/InputPrimary';
import ThreeColumnGrid from '../../common/card/ThreeColumnGrid';
import SelectPrimary from '../../common/select/SelectPrimary';
import CardPrimary from '../../common/card/CardPrimary';
import TopicOfCard from '../../common/topic/TopicOfCard';
import HoverableButton from '../../common/button/HoverableButton';
import PrintButton from '../components/PrintButton';

// css
import styles from '../../common/table/Table.module.css';
import { GetAllCompanyBranchesResponse, GetCompanyBranchData } from '../../types/helper/api/companyBranchTypes';
import { getAllCompanyBranchesApi } from '../../helper/api/companyBranch';
import { GetAllInsuranceCompanyResponse, GetInsuranceCompanyData } from '../../types/helper/api/insuranceCompanyTypes';
import { getAllInsuranceCompanyApi } from '../../helper/api/insuranceCompany';
import { GetCompanyData, GetCompanyDataResponse } from '../../types/helper/api/companyTypes';
import { getCompanyDataApi } from '../../helper/api/company';
import { filteredData } from '../../helper/utils/filter';
import { getInvoiceForPrintApi } from '../../helper/api/preInvoice';
import { GetInvoiceForPrintResponse, InvoiceData } from '../../types/helper/api/preInvoiceType';
import Loading from '../../components/Loading';

export default function PrintInvoice() {

    const CHUNK_SIZE = 29;

    const [printDate, setPrintDate] = useState<string>(moment(new Date).format('YYYY-MM-DD'));
    const [selectedCompanyBranch, setSelectedCompanyBranch] = useState<string>('');
    const [selectedInsuranceCompany, setSelectedInsuranceCompany] = useState<string>('');
    const [companyBranchDatas, setCompanyBranchdatas] = useState<GetCompanyBranchData[]>([]);
    const [insuranceCompanyDatas, setInsuranceCompanyDatas] = useState<GetInsuranceCompanyData[]>([]);
    const [companyData, setCompanyData] = useState<GetCompanyData>({
        _id: '',
        company_name: '',
        company_tax_id: '',
        company_tel: '',
        company_email: '',
    });
    const [invoiceDatas, setInvoiceDatas] = useState<InvoiceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Calculate total price for summation on the last page
    const totalPrice = invoiceDatas.reduce((sum, item) => sum + item.pre_invoice_total_price, 0);
    const paginatedInvoices = useMemo(() => chunkArray(invoiceDatas, CHUNK_SIZE), [invoiceDatas]);

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

    const getAllCompanyBranches = async () => {
        try {
            const result: GetAllCompanyBranchesResponse = await getAllCompanyBranchesApi();
            if (result.status === 'OK') {
                setCompanyBranchdatas(result.data)
            }
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllInsuranceCompany = async () => {
        try {
            const result: GetAllInsuranceCompanyResponse = await getAllInsuranceCompanyApi();
            if (result.status === 'OK') return setInsuranceCompanyDatas(result.data)
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getInvoiceForPrint = async () => {
        setIsLoading(true);
        try {
            const result: GetInvoiceForPrintResponse = await getInvoiceForPrintApi(selectedCompanyBranch, selectedInsuranceCompany, printDate);
            if (result.status === 'OK') {
                setInvoiceDatas(result.data);
                console.log(result);
            }
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
        getCompanyData();
        getAllInsuranceCompany();
        getAllCompanyBranches();
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <CardPrimary className='mb-10'>
                <TopicOfCard text='ข้อมูลสำหรับปริ้นใบวางบิล' />
                <ThreeColumnGrid>
                    <SelectPrimary
                        labelTag='สาขา'
                        optionDatas={companyBranchDatas}
                        selectedValue={selectedCompanyBranch}
                        keyValue='_id'
                        keyDisplayValue='company_branch_name'
                        onChange={value => setSelectedCompanyBranch(value as string)}
                    />
                    <SelectPrimary
                        labelTag='ลูกค้า'
                        optionDatas={insuranceCompanyDatas}
                        selectedValue={selectedInsuranceCompany}
                        keyValue='_id'
                        keyDisplayValue='insurance_company_name'
                        onChange={value => setSelectedInsuranceCompany(value as string)}
                    />
                    <InputDateAndTime
                        labelTag='วันที่ต้องการปริ้น'
                        placeholder='กรุณาเลือกวันที่'
                        type='date'
                        value={printDate}
                        onChange={formattedDate => setPrintDate(formattedDate)}
                    />
                </ThreeColumnGrid >
                <div className='flex justify-end items-center'>
                    <HoverableButton
                        text='สร้างใบวางบิล'
                        textColor='text-emeraldGreen'
                        bgColor='bg-emeraldGreen'
                        borderColor='border-emeraldGreen'
                        onClick={() => getInvoiceForPrint()}
                    />
                </div>
            </CardPrimary>

            <PrintButton text='ปริ้นใบวางบิล' />

            <div id='print-area' className='font-sans print-page w-[21cm] h-full bg-white px-5 flex flex-col'>
                {invoiceDatas.length < 1 && (
                    <>
                        <div className='text-center text-2xl font-bold pt-5'>
                            ไม่มีข้อมูล | กรุณาเลือกข้อมูลสำหรับปริ้นใบวางบิล
                        </div>
                        <div className='text-center text-2xl font-bold pt-5'>
                            จากนั้นกด "สร้างใบวางบิล" เพื่อโหลดข้อมูล
                        </div>
                    </>
                )}
                {paginatedInvoices.map((invoiceChunk, pageIndex) => {
                    const isLastPage = pageIndex === paginatedInvoices.length - 1;
                    const startIndex = pageIndex * CHUNK_SIZE; // Ensure continuous numbering

                    return (
                        <div key={pageIndex} className='w-full break-after-page'>
                            <Header
                                companyData={companyData}
                                companyBranchDatas={companyBranchDatas}
                                insuranceCompanyDatas={insuranceCompanyDatas}
                                selectedCompanyBranch={selectedCompanyBranch}
                                selectedInsuranceCompany={selectedInsuranceCompany}
                            />
                            <Table invoiceDatas={invoiceChunk} startIndex={startIndex} />

                            {/* Summation + Footer only on the last page */}
                            {isLastPage && (
                                <div className='mt-5'>
                                    <div className='text-right text-lg mb-4'>
                                        จำนวนเงินรวมทั้งสิ้น: {currency(totalPrice, 2, 2)} บาท
                                    </div>
                                    <Footer />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
        array.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
};

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
    companyBranchDatas: GetCompanyBranchData[];
    insuranceCompanyDatas: GetInsuranceCompanyData[];
    selectedCompanyBranch: string;
    selectedInsuranceCompany: string;
}
function Header({ companyData, companyBranchDatas, insuranceCompanyDatas, selectedCompanyBranch, selectedInsuranceCompany }: HeaderProps) {
    return (
        <>
            <div className='mb-2 font-bold text-[30px] text-center'>{companyData.company_name}</div>
            <div className='text-center'>{filteredData(companyBranchDatas, selectedCompanyBranch, '_id', 'company_branch_name')} : {filteredData(companyBranchDatas, selectedCompanyBranch, '_id', 'company_branch_address')}</div>

            <div className='flex justify-center items-center gap-x-5 mb-6'>
                {/* <InformationDetail topic='เลขประจำตัวผู้เสียภาษีอากร' detail={companyData.companyTaxId} /> */}
                <InformationDetail topic='โทร' detail={companyData.company_tel} />
                <InformationDetail topic='Email' detail={companyData.company_email} />
            </div>

            <div className='mb-2 font-bold text-[30px] text-center'>ใบวางบิล</div>
            <div className='grid grid-cols-[auto_1fr] gap-x-3 mb-4'>
                <div className='font-bold'>ชื่อลูกค้า</div>
                <div>{filteredData(insuranceCompanyDatas, selectedInsuranceCompany, '_id', 'insurance_company_name')}</div>
                <div className='font-bold'>ที่อยู่</div>
                <div>{filteredData(insuranceCompanyDatas, selectedInsuranceCompany, '_id', 'insurance_company_address')}</div>
            </div>
        </>
    )
}

type TableProps = {
    invoiceDatas: InvoiceData[];
    startIndex: number;
};

function Table({ invoiceDatas, startIndex }: TableProps) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className='text-center border'>ลำดับ</th>
                    <th className='text-center border'>เลขที่เคลม</th>
                    <th className='text-center border'>ทะเบียนรถ</th>
                    <th className='text-center border'>จำนวนเงิน</th>
                    <th className='text-center border'>หมายเหตุ</th>
                </tr>
            </thead>
            <tbody>
                {invoiceDatas.map((invoiceData, index) => (
                    <tr key={index}>
                        <td className='text-md border text-center'>{startIndex + index + 1}</td>
                        <td className='text-md border text-left pl-2'>{invoiceData.claim_no}</td>
                        <td className='text-md border text-left pl-2'>{invoiceData.license_plate}</td>
                        <td className='text-md border text-right pr-2'>{currency(invoiceData.pre_invoice_total_price, 2, 2)}</td>
                        <td className='text-md border text-center pl-2'>{invoiceData.ex_save}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

function Footer() {
    return (
        <div className='flex justify-between items-start'>
            <div>
                <div className='mb-3'>ลงชื่อ____________________________ผู้วางบิล</div>
                <div>วันวางบิล_________/_________/_________</div>
            </div>
            <div>
                <div className='mb-3'>ลงชื่อ____________________________ผู้รับเรื่อง</div>
                <div className='mb-3'>วันวางบิล_________/_________/_________</div>
                <div>นัดชำระ_________/_________/_________</div>
            </div>
        </div>
    )
}