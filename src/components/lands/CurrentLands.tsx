import React from 'react';
import Color from '../../definitions/Color';
import DeleteItem from '../common/DeleteItem';
import Heading from '../common/Heading';
import Card from '../../definitions/Card';
import CurrentBasicLand from './CurrentBasicLand';

type Props = {
    colors: Color[],
    colorlessLandColor: Color,
    basicLandCounts: Record<Color, number>,
    nonBasics: Card[],
    onAddBasicLand: (color: Color) => void,
    onSubtractBasicLand: (color: Color) => void,
    onToggleOption: (card: Card) => void,
};

const CurrentLands: React.FC<Props> = ({
    colors,
    colorlessLandColor,
    basicLandCounts,
    nonBasics,
    onAddBasicLand,
    onSubtractBasicLand,
    onToggleOption,
}) => {
    return (
        <React.Fragment>
            <Heading tag="h3" size="medium">Current Deck</Heading>
            <div className="u-vr" />
            <ul>
                {colors.map(color => (
                    <li key={color}>
                        <CurrentBasicLand
                            count={basicLandCounts[color]}
                            color={color}
                            onAdd={() => onAddBasicLand(color)}
                            onSubtract={() => onSubtractBasicLand(color)}
                        />
                    </li>
                ))}
                {colors.length === 0 && (
                    <li key={colorlessLandColor}>
                        <CurrentBasicLand
                            count={basicLandCounts[colorlessLandColor]}
                            color={colorlessLandColor}
                            onAdd={() => onAddBasicLand(colorlessLandColor)}
                            onSubtract={() => onSubtractBasicLand(colorlessLandColor)}
                        />
                    </li>
                )}
                {nonBasics.map(land => (
                    <li key={land.id}>
                        <DeleteItem onDelete={() => onToggleOption(land)}>
                            {land.frontFace.name}
                        </DeleteItem>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
};

export default CurrentLands;
