import React from 'react';
import Color from '../../definitions/Color';
import { PLURAL_LAND_NAMES } from '../../lib/consts';

type Props = {
    color: Color,
    pipCount: number,
    pipSum: number,
    basicCount: number,
    onBasicChange: (count: number) => void,
};

const BasicLandRow: React.FC<Props> = ({ color, basicCount, pipCount, pipSum, onBasicChange }) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onBasicChange(Number(e.target.value));
    };

    return (
        <>
            <div>
                {PLURAL_LAND_NAMES[color]}
                <input
                    value={basicCount}
                    type="number"
                    inputMode="numeric"
                    size={3}
                    onChange={onInputChange}
                />
            </div>
            <div>Pips x {pipCount} ({Math.round(100 * pipCount / pipSum)}%)</div>
        </>
    );
};

export default BasicLandRow;