import React from 'react';
import Color from '../../definitions/Color';
import MINUS_SVG from '../../assets/images/minus.svg';
import PLUS_SVG from '../../assets/images/plus.svg';
import { SINGULAR_LAND_NAMES, PLURAL_LAND_NAMES } from '../../lib/consts';

type Props = {
    count: number,
    color: Color,
    onAdd: () => void,
    onSubtract: () => void,
};

const CurrentBasicLand: React.FC<Props> = ({ count, color, onAdd, onSubtract }) => {
    return (
    <div className="o-h-list o-h-list--center">
        <button type="button" onClick={() => onAdd()}>
            <img src={PLUS_SVG} width={22} height={22} alt="Add 1 land" />
        </button>
        {count > 0 && (
            <button type="button" onClick={() => onSubtract}>
                <img src={MINUS_SVG} width={22} height={22} alt="Subtract 1 land" />
            </button>
        )}
        <span>
            {count !== 1 && `${count} ${PLURAL_LAND_NAMES[color]}`}
            {count === 1 && `${count} ${SINGULAR_LAND_NAMES[color]}`}
        </span>
    </div>
    );
};

export default CurrentBasicLand;
