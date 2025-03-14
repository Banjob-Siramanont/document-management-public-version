import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

// Helper
import { convertDateToThai } from '../../helper/utils/date';
import { getQuotationCoverForPrintApi } from '../../helper/api/quotationCover';

// Component
import PrintButton from '../components/PrintButton';
import InputDateAndTime from '../../common/input/InputDateAndTime';

// css
import styles from '../../common/table/Table.module.css';

// Type
import { ClaimIdData, GetQuotationCoverForPrintResponse } from '../../types/helper/api/quotationCoverTypes';

export default function PrintQuotationCover() {

    const EMPTY_DATA = {
        claim_no: '',
        license_plate: ''
    };

    const CHUNK_SIZE = 37;

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [sendDate, setSendDate] = useState<string>(moment(new Date).format('YYYY-MM-DD'));
    const [claimIdDatas, setClaimIdDatas] = useState<ClaimIdData[]>([]);

    const paginatedDatas = useMemo(() => chunkArray(claimIdDatas, CHUNK_SIZE, EMPTY_DATA), [claimIdDatas]);

    const getQuotationCoverForPrint = async () => {
        try {
            const result: GetQuotationCoverForPrintResponse = await getQuotationCoverForPrintApi(id as string);
            if (result.status === 'OK') return setClaimIdDatas(result.data);
            else console.log(result.client_message);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuotationCoverForPrint();
    }, []);

    return (
        <>
            <InputDateAndTime
                className='mb-5'
                labelTag='วันที่ส่งเอกสาร'
                placeholder='กรุณาเลือกวันที่'
                type='date'
                value={sendDate}
                onChange={formattedDate => setSendDate(formattedDate)}
            />
            <PrintButton text='ปริ้น' />

            <div id='print-area' className='font-sans print-page w-[21cm] h-full bg-white px-5'>
                {paginatedDatas.map((paginatedData, index) => (
                    <React.Fragment key={index}>
                        <HeaderQuotationCover sendDate={sendDate} />
                        <TableQuotationCover claimIdDatas={paginatedData} startIndex={CHUNK_SIZE * index} />
                        <FooterQuotationCover />
                    </React.Fragment>
                ))}
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
    console.log(chunks);
    return chunks;
};

function HeaderQuotationCover({ sendDate }: { sendDate: string }) {
    return (
        <>
            <div className='text-center font-bold text-3xl'>บันทึกงานประเมินราคา</div>
            <div className='flex justify-between items-center text-lg my-2'>
                <div>ชื่อ: บริษัท เค.ที.ยานยนต์ ซินซ์ 2009 จำกัด</div>
                <div>วันที่ {convertDateToThai(sendDate)}</div>
            </div>
        </>
    )
}

type TableQuotationCoverProps = {
    claimIdDatas: { claim_no: string, license_plate: string }[];
    startIndex: number;
}
function TableQuotationCover({ claimIdDatas, startIndex }: TableQuotationCoverProps) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th rowSpan={2} className='border w-[8%]'>ลำดับที่</th>
                    <th rowSpan={2} className='border w-[180px]'>เลขที่เคลม</th>
                    <th rowSpan={2} className='border w-[150px]'>ทะเบียน</th>
                    <th colSpan={2} className='border'>รถ</th>
                    <th rowSpan={2} className='border'>หมายเหตุ</th>
                </tr>
                <tr>
                    <th className='border w-[50px]'>INS</th>
                    <th className='border w-[50px]'>T/P</th>
                </tr>
            </thead>
            <tbody>
                {claimIdDatas.map((claimIdData: ClaimIdData, index: number) => (
                    <tr key={index}>
                        <td className='border text-center'>{startIndex + index + 1}</td>
                        <td className='border px-2'>{claimIdData.claim_no}</td>
                        <td className='border px-2'>{claimIdData.license_plate}</td>
                        <td className='border'></td>
                        <td className='border'></td>
                        <td className='border'></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function FooterQuotationCover() {
    return (
        <div className='flex justify-between items-center mt-5'>
            <div>
                <div>ลงชื่อ__________________________พนักงานประเมินราคา</div>
                <div className='pl-4 mt-3'>วันที่__________/__________/__________</div>
            </div>
            <div>
                <div>ผู้ตรวจ__________________________หน.หน่วย</div>
                <div className='pl-4 mt-3'>วันที่__________/__________/__________</div>
            </div>
        </div>
    )
}