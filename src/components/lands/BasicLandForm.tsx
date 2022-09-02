import React from 'react';
import Color from '../../definitions/Color';
import Format from '../../definitions/Format';
import Checkbox from '../common/Checkbox';
import BasicLandInputRow from './BasicLandInputRow';
import ColorlessLandInputRow from './ColorlessLandInputRow';

type Props = {
    colors: Color[],
    format: Format,
    colorlessLandColor: Color,
    onColorlessLandColorChange: (color: Color) => void,
    isSnow: boolean,
    pipCounts: Record<Color, number>,
    basicLandCounts: Record<Color, number>,
    onInputChange: (color: Color, count: number) => void,
    onIsSnowToggle: (isSnow: boolean) => void,
    onArtModalOpen: (color: Color) => void,
};

const BasicLandForm: React.FC<Props> = ({
    colors,
    format,
    colorlessLandColor,
    onColorlessLandColorChange,
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
            {format === 'historic' && (
                <>
                    <Checkbox
                        name="is-snow"
                        value="yes"
                        label="Snow Lands"
                        checked={isSnow}
                        onToggle={onIsSnowToggle}
                    />
                    <div className="u-vr u-vr--x2" />
                </>
            )}
            <ul className="o-v-list o-v-list--x2">
                {colors.map(color => (
                    <li key={color}>
                        <BasicLandInputRow
                            color={color}
                            pipCount={pipCounts[color]}
                            pipSum={pipSum}
                            basicCount={basicLandCounts[color]}
                            onBasicChange={(count) => onInputChange(color, count)}
                            onArtSelect={() => onArtModalOpen(color)}
                        />
                    </li>
                ))}
                {colors.length === 0 && (
                    <li>
                        <ColorlessLandInputRow
                            color={colorlessLandColor}
                            basicCount={basicLandCounts[colorlessLandColor]}
                            onBasicChange={(count) => onInputChange(colorlessLandColor, count)}
                            onArtSelect={() => onArtModalOpen(colorlessLandColor)}
                            onColorChange={onColorlessLandColorChange}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default BasicLandForm;
