import React, { useEffect, useMemo, useState } from 'react';

// Hewlper
import { currency } from '../../helper/utils/currency';
import { getQuotationForPrintApi } from '../../helper/api/quotation';

// Component
import PrintButton from '../components/PrintButton';
import { GetQuotationForPrintResponse, QuotationDataForPrint, ReplacingSparePartData, WageData } from '../../types/helper/api/quotationTypes';
import Loading from '../../components/Loading';

export default function PrintQuotation() {

    const EMPTY_SPARE_PART_DATA: ReplacingSparePartData = {
        id: -1, // Use -1 to indicate an empty row
        spare_part_name: '',
        spare_part_id: '',
        price: 0
    };
    const EMPTY_WAGE_DATA: WageData = {
        id: -1,
        wage: '',
        price: 0,
    };

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [quotationData, setQuotaionData] = useState<QuotationDataForPrint>();
    const [replacingSparePartDatas, setReplacingSparePartDatas] = useState<ReplacingSparePartData[]>([{
        id: 1,
        spare_part_id: '',
        spare_part_name: '',
        price: 0,
    }]);
    const [wageDatas, setWageData] = useState<WageData[]>([{
        id: 0,
        wage: '',
        price: 0,
    }]);
    const CHUNK_SIZE = quotationData?.insurance_company_short_name === 'กรุงเทพประกันภัย' ? 25 : 30;

    const getQuotationForPrint = async () => {
        setIsLoading(true);
        try {
            const result: GetQuotationForPrintResponse = await getQuotationForPrintApi(id as string);

            if (result.status === 'OK') {
                setQuotaionData(result.data);
                setReplacingSparePartDatas(result.data.replacing_spare_part_datas);
                setWageData(result.data.wage_datas);
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
        getQuotationForPrint()
    }, []);

    const paginatedSparePart = useMemo(() => chunkArray(replacingSparePartDatas, CHUNK_SIZE, EMPTY_SPARE_PART_DATA), [replacingSparePartDatas]);
    const paginatedWage = useMemo(() => chunkArray(wageDatas, CHUNK_SIZE, EMPTY_WAGE_DATA), [wageDatas]);

    const groupOfPaginatedSparePart = useMemo(() => chunkArrayInChunkArray(paginatedSparePart, 2), paginatedSparePart);

    const totalWagePrice = wageDatas.reduce((sum, item) => sum + Number(item.price), 0);

    return (
        <>
            <Loading isLoading={isLoading} />
            <PrintButton text='ปริ้น' />
            <div id='print-area' className='font-sans print-page w-[21cm] h-full bg-white px-5 flex flex-col'>
                {groupOfPaginatedSparePart.map((groupOfPaginated, index) => {
                    const isLastPage = index === groupOfPaginatedSparePart.length - 1;
                    const sumOfTotalSparePartPrice = groupOfPaginated.reduce(
                        (sum, replacingSparePartDataArr) =>
                            sum + replacingSparePartDataArr.reduce((s, item) => s + Number(item.price), 0),
                        0
                    );
                    return (
                        <React.Fragment key={index}>
                            <Header quotationData={quotationData!} />
                            <div className='grid grid-cols-2'>
                                {groupOfPaginated.map((replacingSparePartDataArr, idx) => {

                                    const absoluteIndex = index * 2 + idx;
                                    const startIndex = absoluteIndex * CHUNK_SIZE;
                                    const totalSparePartPrice = replacingSparePartDataArr.reduce((sum, item) => sum + Number(item.price), 0);

                                    return (
                                        <div key={idx}> {/* ต้องใส่ div ไว้เพื่อให้มัน render row ทั้ง 2 ฝั่งเท่ากันพอดี */}
                                            <SparePartTable
                                                replacingSparePartDatas={replacingSparePartDataArr}
                                                startIndex={startIndex}
                                                totalSparePartPrice={totalSparePartPrice}
                                            />
                                        </div>
                                    )
                                })}
                                {(isLastPage && (groupOfPaginated.length !== 2)) && (
                                    <WageTable
                                        wageDatas={paginatedWage[0]}
                                        totalWagePrice={totalWagePrice}
                                    />
                                )}
                                {(isLastPage && (groupOfPaginated.length !== 2)) && (
                                    <div className='text-right pr-2 mt-3 col-span-2'>
                                        รวมราคา {currency(sumOfTotalSparePartPrice + totalWagePrice, 2, 2)} บาท
                                    </div>
                                )}
                                {!(isLastPage && (groupOfPaginated.length !== 2)) && (
                                    <div className='text-right pr-2 mt-3 col-span-2'>
                                        รวมราคา {currency(sumOfTotalSparePartPrice, 2, 2)} บาท
                                    </div>
                                )}
                            </div>
                            <Bidder />
                            {quotationData?.insurance_company_short_name === 'กรุงเทพประกันภัย' && (
                                <Footer />
                            )}
                            <div className='break-after-page'></div>
                        </React.Fragment>
                    )
                })}
                {groupOfPaginatedSparePart[groupOfPaginatedSparePart.length - 1].length === 2 && (
                    <>
                        <Header quotationData={quotationData!} />
                        <div className='grid grid-cols-1'>
                            <WageTable
                                wageDatas={paginatedWage[0]}
                                totalWagePrice={totalWagePrice}
                            />
                        </div>
                        <Bidder />
                        {quotationData?.insurance_company_short_name === 'กรุงเทพประกันภัย' && (
                            <Footer />
                        )}
                    </>
                )}
            </div>
        </>
    )
}

const chunkArray = <T extends object>(array: T[], chunkSize: number, emptyData: T): T[][] => {
    const chunks = Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
        array.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    // Ensure the last chunk is padded with empty data
    if (chunks.length > 0) {
        const lastChunk = chunks[chunks.length - 1];
        while (lastChunk.length < chunkSize) {
            lastChunk.push(emptyData);
        }
    }

    return chunks;
};

const chunkArrayInChunkArray = <T extends unknown>(array: T[][], chunkSize: number): T[][][] => {
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
    quotationData: QuotationDataForPrint;
}
function Header({ quotationData }: HeaderProps) {
    return (
        <>
            <div className='mb-2 font-bold text-[30px] text-center'>{quotationData?.company_name}</div>
            <div className='text-center'>{quotationData?.company_branch_name} : {quotationData?.company_branch_address}</div>

            <div className='flex justify-center items-center gap-x-5 mb-2'>
                <InformationDetail topic='เลขประจำตัวผู้เสียภาษีอากร' detail={quotationData?.company_tax_id} />
                <InformationDetail topic='โทร' detail={quotationData?.company_tel} />
                <InformationDetail topic='Email' detail={quotationData?.company_email} />
            </div>

            <div className='text-right pr-2 mb-1'>วันที่ {quotationData?.quotation_create_date}</div>
            {quotationData?.insurance_company_short_name === 'กรุงเทพประกันภัย' && (
                <div>เรียน ผู้จัดการแผนกประกันภัยยานยนต์ {quotationData?.insurance_company_name}</div>
            )}
            {quotationData?.insurance_company_short_name !== 'กรุงเทพประกันภัย' && (
                <div>เรียน {quotationData?.insurance_company_name}</div>
            )}
            <div className='grid grid-cols-[1fr_0.8fr] gap-x-3'>
                <div>ขอเสนอราคาซ่อมรถจักรยานยนต์ <span className='font-semibold'>{quotationData?.vehicle_name}</span></div>
                <div>เลขทะเบียน <span className='font-semibold'>{quotationData?.license_plate}</span></div>
            </div>
            <div className='mb-4'>เลขเคลม <span className='font-semibold'>{quotationData?.claim_no}</span></div>
        </>
    )
}

type SparePartTableProps = {
    replacingSparePartDatas: ReplacingSparePartData[];
    startIndex: number;
    totalSparePartPrice: number;
};

function SparePartTable({ replacingSparePartDatas, startIndex, totalSparePartPrice }: SparePartTableProps) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className='border w-[8%]'>ลำดับที่</th>
                        <th className='border w-[30%]'>รายการเปลี่ยนอะไหล่</th>
                        <th className='border w-[12%]'>ราคา</th>
                    </tr>
                </thead>
                <tbody>
                    {replacingSparePartDatas.map((replacingSparePartData, index) => {
                        return (
                            <tr key={index}>
                                <td className='border text-center'>{startIndex + index + 1}</td>
                                <td className='border pl-2'>{replacingSparePartData.spare_part_name}</td>
                                <td className='border text-right pr-2'>{replacingSparePartData.price ? currency(replacingSparePartData.price, 2, 2) : ''}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td className='text-right pr-2'>รวมราคาอะไหล่</td>
                        <td className='border text-right pr-2'>{currency(totalSparePartPrice, 2, 2)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

type WageTableProps = {
    wageDatas: WageData[];
    totalWagePrice: number;
}
function WageTable({ wageDatas, totalWagePrice }: WageTableProps) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className='border w-[8%]'>ลำดับที่</th>
                        <th className='border w-[30%]'>รายการซ่อม / เคาะพ่นสี</th>
                        <th className='border w-[12%]'>ราคา</th>
                    </tr>
                </thead>
                <tbody>
                    {wageDatas.map((wageData, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className='border text-center'>{index + 1}</td>
                                    <td className='border pl-2'>{wageData.wage}</td>
                                    <td className='border text-right pr-2'>{wageData.price ? currency(wageData.price, 2, 2) : ''}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                    <tr>
                        <td className='border border-white'></td>
                        <td className='border border-r-0 border-white text-right pr-2'>รวมราคาซ่อม / เคาะพ่นสี</td>
                        <td className='border text-right pr-2'>{currency(totalWagePrice, 2, 2)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

function Bidder() {
    return (
        <div className='text-right pr-2 mt-1 mb-4'>ผู้เสนอราคา สุวรรณ (ตัวแทนอู่)</div>
    )
}

function Footer() {
    return (
        <>
            <div className='border-[2px] bg-white grid grid-cols-2 text-[15px]'>
                <div className='border-r-[2px]'>
                    <div className='border-b-[2px] px-2'>เฉพาะเจ้าหน้าที่ บริษัท กรุงเทพประกันภัย จำกัด (มหาชน)</div>
                    <div className='px-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 mb-2'>
                        <div>ค่าแรง</div>
                        <div className='border-b' />
                        <div>ค่าอะไหล่</div>
                        <div className='border-b' />
                        <div>ค่า EX</div>
                        <div className='border-b' />
                        <div>รวมค่าซ่อมสุทธิ</div>
                        <div className='border-b' />
                        <div>หมายเหตุ</div>
                        <div className='border-b' />
                    </div>
                </div>
                <div className='px-2'>
                    <div className='grid grid-cols-3 gap-y-1'>
                        <RadioInput text='ผู้รับเหมา' />
                        <RadioInput text='ผู้จัดอะไหล่' />
                        <RadioInput text='บริษัทจัดอะไหล่' />
                        <div className='grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 mb-6 col-span-3'>
                            <RadioInput text='อื่น ๆ ' />
                            <div className='border-b' />
                        </div>
                    </div>
                    <div className='border-b mb-7' />
                    <div className='border-b mb-[7px]' />
                    <div className='font-extralight'>________________________/______________________</div>
                    <div className='flex justify-center items-center gap-x-30'>
                        <div>เจ้าหน้าที่</div>
                        <div>ผู้อนุมัติ</div>
                    </div>
                </div>

            </div>
        </>
    )
}

function RadioInput({ text }: { text: string }) {
    return (
        <div className='flex justify-start items-center gap-x-1'>
            <input
                type='radio'
                name='uncontrolled'
                checked={false}
                readOnly
            />
            <label>{text}</label>
        </div>
    )
}