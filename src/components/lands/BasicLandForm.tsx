import React from 'react';
import Color from '../../definitions/Color';
import { PLURAL_LAND_NAMES } from '../../lib/consts';

type Props = {
    colors: Color[],
    pipCounts: Record<Color, number>,
    basicLandCounts: Record<Color, number>,
    onInputChange: (color: Color, count: number) => void,
};

const BasicLandForm: React.FC<Props> = ({ colors, pipCounts, basicLandCounts, onInputChange }) => {
    return (
        <div className="o-h-list">
            {colors.map(color => (
                <div key={color}>
                    <div>
                        {PLURAL_LAND_NAMES[color]}
                        <input
                            value={basicLandCounts[color]}
                            type="number"
                            inputMode="numeric"
                            size={3}
                            onChange={e => onInputChange(color, Number(e.target.value))}
                        />
                    </div>
                    <div>Pips x {pipCounts[color]}</div>
                </div>
            ))}
        </div>
    );
};

export default BasicLandForm;
