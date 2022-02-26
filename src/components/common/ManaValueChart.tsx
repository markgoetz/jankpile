import React from 'react';
import Card from '../../definitions/Card';
import getManaValues from '../../lib/utils/getManaValues';

type Props = {
    spells: Card[],
};

const MAX_MANA_VALUE = 7;
const SIZE = 44;

const ManaValueChart: React.FC<Props> = ({ spells }) => {
    const manaValues = getManaValues(spells, MAX_MANA_VALUE);
    const maxManaValue = Math.max(...Object.values(manaValues));
    const heights = Object.keys(manaValues).reduce(
        (prevHeights, manaValue) => ({
            ...prevHeights,
            [manaValue]: SIZE * manaValues[Number(manaValue)] / maxManaValue,
        }),
        {} as Record<number, number>,
    );

    return (
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE} className="c-mana-value-chart">
            <rect x={1} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={7} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={13} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={19} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={25} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={31} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={37} y={0} width={5} height={SIZE} className="c-mana-value-chart__background" />
            <rect x={1} y={SIZE -  (heights[1] ?? 0)} width={5} height={heights[1]} className="c-mana-value-chart__bar" />
            <rect x={7} y={SIZE -  (heights[2] ?? 0)} width={5} height={heights[2]} className="c-mana-value-chart__bar" />
            <rect x={13} y={SIZE - (heights[3] ?? 0)} width={5} height={heights[3]} className="c-mana-value-chart__bar" />
            <rect x={19} y={SIZE - (heights[4] ?? 0)} width={5} height={heights[4]} className="c-mana-value-chart__bar" />
            <rect x={25} y={SIZE - (heights[5] ?? 0)} width={5} height={heights[5]} className="c-mana-value-chart__bar" />
            <rect x={31} y={SIZE - (heights[6] ?? 0)} width={5} height={heights[6]} className="c-mana-value-chart__bar" />
            <rect x={37} y={SIZE - (heights[7] ?? 0)} width={5} height={heights[7]} className="c-mana-value-chart__bar" />
        </svg>
    );
};

export default ManaValueChart;
