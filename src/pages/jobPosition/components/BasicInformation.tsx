import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputPrimary from '../../../common/input/InputPrimary';

type BasicInformationProps = {
    jobPosition: string;
    setJobPosition: (value: string) => void
};
export default function BasicInformation({ jobPosition, setJobPosition }: BasicInformationProps) {
    return (
        <ThreeColumnGrid>
            <InputPrimary
                labelTag='ตำแหน่งงาน'
                placeholder='Exclusive Developer'
                type='text'
                value={jobPosition}
                onChange={event => setJobPosition(event.target.value)}
            />
        </ThreeColumnGrid>
    )
}