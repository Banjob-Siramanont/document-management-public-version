import ThreeColumnGrid from '../../../common/card/ThreeColumnGrid';
import InputPrimary from '../../../common/input/InputPrimary';

type BasicInformationProps = {
    vehicleColor: string;
    onChange: (value: string) => void
};
export default function BasicInformation({ vehicleColor, onChange }: BasicInformationProps) {
    return (
        <ThreeColumnGrid>
            <InputPrimary
                labelTag='สี'
                placeholder='สีดำ / สีแดง / สีดำ-แดง (พิมพ์คำว่า "สี" ด้วย)'
                type='text'
                value={vehicleColor}
                onChange={event => onChange(event.target.value)}
            />
        </ThreeColumnGrid>
    )
}