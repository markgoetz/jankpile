import React from 'react';
import Color from '../../definitions/Color';
import { PLURAL_LAND_NAMES } from '../../lib/consts';
import W_SVG from '../../assets/images/W.svg';
import U_SVG from '../../assets/images/U.svg';
import B_SVG from '../../assets/images/B.svg';
import R_SVG from '../../assets/images/R.svg';
import G_SVG from '../../assets/images/G.svg';
import Button from '../common/Button';

const ICONS_BY_COLOR = {
    [Color.WHITE]: W_SVG,
    [Color.BLUE]: U_SVG,
    [Color.BLACK]: B_SVG,
    [Color.RED]: R_SVG,
    [Color.GREEN]: G_SVG,
};

type Props = {
    color: Color,
    pipCount: number,
    pipSum: number,
    basicCount: number,
    onBasicChange: (count: number) => void,
    onArtSelect: () => void,
};

const BasicLandRow: React.FC<Props> = ({ color, basicCount, pipCount, pipSum, onBasicChange, onArtSelect }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onBasicChange(Number(e.target.value));
    };

    return (
        <div className="c-basic-land-row">
            <div className="c-basic-land-row__icon">
                <img src={ICONS_BY_COLOR[color]} alt="" width={44} height={44} />
            </div>
            <div className="c-basic-land-row__name">
                <span className="u-txt--heading u-txt--bold u-txt--24">
                    {PLURAL_LAND_NAMES[color]}
                </span>
            </div>
            <div className="c-basic-land-row__pips">
                <span className="u-txt--16">
                    Pips x {pipCount} ({Math.round(100 * pipCount / pipSum)}%)
                </span>
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

export default BasicLandRow;