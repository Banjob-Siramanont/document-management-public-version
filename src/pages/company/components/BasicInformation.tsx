import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputPrimary from '../../../common/input/InputPrimary';

type BasicInformationProps = {
    companyBranchName: string;
    setCompanyBranchName: (value: string) => void;
    companyBranchAddress: string;
    setCompanyBranchAddress: (value: string) => void;
};
export default function BasicInformation({
    companyBranchName,
    setCompanyBranchName,
    companyBranchAddress,
    setCompanyBranchAddress
}: BasicInformationProps) {
    return (
        <ThreeColumnGrid>
            <InputPrimary
                labelTag='ชื่อสาขา'
                placeholder='สำนักงานใหญ่'
                type='text'
                value={companyBranchName}
                onChange={event => setCompanyBranchName(event.target.value)}
            />
            <InputPrimary
                labelTag='ที่อยู่'
                placeholder='เลขที่26 ถนนสมเด็จพระเจ้าตากสิน แขวงบุคคโล เขตธนบุรี กรุงเทพฯ 10600'
                type='text'
                value={companyBranchAddress}
                onChange={event => setCompanyBranchAddress(event.target.value)}
            />
        </ThreeColumnGrid>
    )
}