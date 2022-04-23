import React from 'react';
import Color from '../../definitions/Color';
import Checkbox from '../common/Checkbox';
import BasicLandRow from './BasicLandRow';

type Props = {
    colors: Color[],
    isSnow: boolean,
    pipCounts: Record<Color, number>,
    basicLandCounts: Record<Color, number>,
    onInputChange: (color: Color, count: number) => void,
    onIsSnowToggle: (isSnow: boolean) => void,
    onArtModalOpen: (color: Color) => void,
};

const BasicLandForm: React.FC<Props> = ({
    colors,
    isSnow,
    pipCounts,
    basicLandCounts,
    onInputChange,
    onIsSnowToggle,
    onArtModalOpen,
}) => {
    const pipSum = Object.values(pipCounts).reduce((current, prev) => current + prev);

    return (
        <div className="c-form">
            <Checkbox
                name="is-snow"
                value="yes"
                label="Snow Lands"
                checked={isSnow}
                onToggle={onIsSnowToggle}
            />
            <div className="u-vr u-vr--x2" />
            <ul className="o-v-list o-v-list--x2">
                {colors.map(color => (
                    <li key={color}>
                        <BasicLandRow
                            color={color}
                            pipCount={pipCounts[color]}
                            pipSum={pipSum}
                            basicCount={basicLandCounts[color]}
                            onBasicChange={(count) => onInputChange(color, count)}
                            onArtSelect={() => onArtModalOpen(color)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BasicLandForm;
