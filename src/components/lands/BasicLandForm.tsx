import React from 'react';
import Color from '../../definitions/Color';
import BasicLandRow from './BasicLandRow';

type Props = {
    colors: Color[],
    pipCounts: Record<Color, number>,
    basicLandCounts: Record<Color, number>,
    onInputChange: (color: Color, count: number) => void,
};

const BasicLandForm: React.FC<Props> = ({ colors, pipCounts, basicLandCounts, onInputChange }) => {
    const pipSum = Object.values(pipCounts).reduce((current, prev) => current + prev);

    return (
        <ul className="o-h-list">
            {colors.map(color => (
                <li key={color}>
                    <BasicLandRow
                        color={color}
                        pipCount={pipCounts[color]}
                        pipSum={pipSum}
                        basicCount={basicLandCounts[color]}
                        onBasicChange={(count) => onInputChange(color, count)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default BasicLandForm;
