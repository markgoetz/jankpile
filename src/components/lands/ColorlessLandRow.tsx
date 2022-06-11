import React from 'react';
import Color from '../../definitions/Color';
import Button from '../common/Button';
import Dropdown, { Option } from '../common/Dropdown';
import { PLURAL_LAND_NAMES } from '../../lib/consts';
import W_SVG from '../../assets/images/W.svg';
import U_SVG from '../../assets/images/U.svg';
import B_SVG from '../../assets/images/B.svg';
import R_SVG from '../../assets/images/R.svg';
import G_SVG from '../../assets/images/G.svg';

const ICONS_BY_COLOR = {
    [Color.WHITE]: W_SVG,
    [Color.BLUE]: U_SVG,
    [Color.BLACK]: B_SVG,
    [Color.RED]: R_SVG,
    [Color.GREEN]: G_SVG,
};

const OPTIONS: Option[] = [
    { label: PLURAL_LAND_NAMES.W, value: Color.WHITE },
    { label: PLURAL_LAND_NAMES.U, value: Color.BLUE },
    { label: PLURAL_LAND_NAMES.B, value: Color.BLACK },
    { label: PLURAL_LAND_NAMES.R, value: Color.RED },
    { label: PLURAL_LAND_NAMES.G, value: Color.GREEN },
];

type Props = {
    color: Color,
    onColorChange: (color: Color) => void,
    basicCount: number,
    onBasicChange: (count: number) => void,
    onArtSelect: () => void,
};

const ColorlessLandRow: React.FC<Props> = ({ color, onColorChange, basicCount, onBasicChange, onArtSelect }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onBasicChange(Number(e.target.value));
    };

    const onSelectChange = (value: string) => {
        onColorChange(value as Color);
    };

    return (
        <div className="c-basic-land-row">
            <div className="c-basic-land-row__icon">
                <img src={ICONS_BY_COLOR[color]} alt="" width={44} height={44} />
            </div>
            <div className="c-basic-land-row__name">
                <Dropdown value={color} options={OPTIONS} onSelect={onSelectChange} />
            </div>
            <div className="c-basic-land-row__field">
                <input
                    className="c-input"
                    value={basicCount}
                    type="number"
                    inputMode="numeric"
                    size={3}
                    onChange={onInputChange}
                />
            </div>
            <div className="c-basic-land-row__action">
                <Button variation="secondary" onClick={onArtSelect}>Select art...</Button>
            </div>
        </div>
    );
};

export default ColorlessLandRow;
