import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Helper
import { currency } from '../../helper/utils/currency';
import { getQuotationApi } from '../../helper/api/quotation';

// Component
import Topic from '../../common/topic/Topic';
import CardPrimary from '../../common/card/CardPrimary';
import TablePrimary from '../../common/table/TablePrimary';
import TopicOfCard from '../../common/topic/TopicOfCard';
import HoverableButton from '../../common/button/HoverableButton';
import TwoColumnGrid from '../../common/card/TwoColumnGrid';

// Type
import { GetQuotationDataResponse, QuotationData, ReplacingSparePartData, WageData } from '../../types/helper/api/quotationTypes';
import Loading from '../../components/Loading';

export default function PreviewQuotation() {

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const navigate = useNavigate();

    const [quotationData, setQuotaionData] = useState<QuotationData>();
    const [replacingSparePartDatas, setReplacingSparePartDatas] = useState<ReplacingSparePartData[]>([]);
    const [wageDatas, setWageData] = useState<WageData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getQuotation = async () => {
        setIsLoading(true);
        try {
            const result: GetQuotationDataResponse = await getQuotationApi(id as string);

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
        getQuotation()
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className='flex justify-between items-center'>
                <Topic text='รายละเอียดใบเสนอราคา' />
                <div className='flex justify-end items-center gap-x-2 mb-5'>
                    <HoverableButton
                        text='ปริ้น'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => navigate(`/print-quotation/?id=${id}`)}
                    />
                    <HoverableButton
                        text='แก้ไข'
                        textColor='text-orange'
                        bgColor='bg-orange'
                        borderColor='border-orange'
                        onClick={() => navigate(`/quotation-lists/edit?id=${id}`)}
                    />
                </div>
            </div>
            <CardPrimary className='mb-4'>
                <TopicOfCard text='ข้อมูลเบื้องต้น' />
                <div className='grid grid-cols-[150px_1fr] gap-x-2'>
                    <InformationDetail topic='สาขา' text={quotationData?.company_branch_name} />
                    <InformationDetail topic='บริษัทประกันภัย' text={quotationData?.insurance_company_name} />
                    <InformationDetail topic='วันที่สร้างเอกสาร' text={quotationData?.quotation_create_date} />
                    <InformationDetail topic='ชื่อรถจักรยานยนต์' text={quotationData?.vehicle_name} />
                    <InformationDetail topic='เลขทะเบียน' text={quotationData?.license_plate} />
                    <InformationDetail topic='เลขที่เคลม' text={quotationData?.claim_no} />
                    <InformationDetail topic='ราคา ซ่อม / เคาะพ่นสี' text={`${currency(quotationData?.total_wage_price as number, 0, 0)} บาท`} />
                    <InformationDetail topic='ราคา เปลี่ยนอะไหล่' text={`${currency(quotationData?.total_replacing_spare_part_price as number, 0, 0)} บาท`} />
                    <InformationDetail topic='ราคารวม' text={`${currency(quotationData?.total_price as number, 0, 0)} บาท`} />
                </div>
            </CardPrimary>
            <TwoColumnGrid>
                <CardPrimary className='mb-4'>
                    <TopicOfCard text='รายการ เปลี่ยนอะไหล่' />
                    <TablePrimary
                        data={replacingSparePartDatas}
                        rowsPerPage={100}
                        tHeadDatas={[
                            { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'id' },
                            { tHeadTiltle: 'รายการ', cssTextAlign: 'left', key: 'spare_part_name' },
                            { tHeadTiltle: 'ราคา', cssTextAlign: 'right', key: 'price' },
                        ]}
                        keyNameOfId='id'
                        hasEditBtn={false}
                        hasDeleteBtn={false}
                    />
                </CardPrimary>
                <CardPrimary className='mb-4'>
                    <TopicOfCard text='รายการ ซ่อม / เคาะพ่นสี' />
                    <TablePrimary
                        data={wageDatas}
                        rowsPerPage={25}
                        tHeadDatas={[
                            { tHeadTiltle: 'No', cssTextAlign: 'center', key: 'id' },
                            { tHeadTiltle: 'รายการ', cssTextAlign: 'left', key: 'wage' },
                            { tHeadTiltle: 'ราคา', cssTextAlign: 'right', key: 'price' },
                        ]}
                        keyNameOfId='id'
                        hasEditBtn={false}
                        hasDeleteBtn={false}
                    />
                </CardPrimary>
            </TwoColumnGrid>
        </>
    )
}

type InformationDetailProps = {
    topic?: string;
    text?: string;
};

function InformationDetail({ topic, text }: InformationDetailProps) {
    return (
        <>
            <div className='dark:text-smoothWhite'>{topic} :</div>
            <div className='dark:text-smoothWhite'>{text}</div>
        </>
    )
}