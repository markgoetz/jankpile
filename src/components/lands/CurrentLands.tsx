import React from 'react';
import Color from '../../definitions/Color';
import DeleteItem from '../common/DeleteItem';
import Heading from '../common/Heading';
import { SINGULAR_LAND_NAMES, PLURAL_LAND_NAMES } from '../../lib/consts';
import MINUS_SVG from '../../assets/images/minus.svg';
import PLUS_SVG from '../../assets/images/plus.svg';
import Card from '../../definitions/Card';

type Props = {
    colors: Color[],
    basicLandCounts: Record<Color, number>,
    nonBasics: Card[],
    onAddBasicLand: (color: Color) => void,
    onSubtractBasicLand: (color: Color) => void,
    onToggleOption: (card: Card) => void,
};

const CurrentLands: React.FC<Props> = ({
    colors,
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
                        <div className="o-h-list o-h-list--center">
                            <button type="button" onClick={() => onAddBasicLand(color)}>
                                <img src={PLUS_SVG} width={22} height={22} alt="Add 1 land" />
                            </button>
                            {basicLandCounts[color] > 0 && (
                                <button type="button" onClick={() => onSubtractBasicLand(color)}>
                                    <img src={MINUS_SVG} width={22} height={22} alt="Subtract 1 land" />
                                </button>
                            )}
                            <span>
                                {basicLandCounts[color] !== 1 && `${basicLandCounts[color]} ${PLURAL_LAND_NAMES[color]}`}
                                {basicLandCounts[color] === 1 && `${basicLandCounts[color]} ${SINGULAR_LAND_NAMES[color]}`}
                            </span>
                        </div>
                    </li>
                ))}
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
