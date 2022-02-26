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
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
            <rect x={1} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={7} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={13} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={19} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={25} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={31} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={37} y={0} width={5} height={SIZE} fill="#F5EFDE" />
            <rect x={1} y={SIZE - heights[1]} width={5} height={heights[1]} fill="#745206" />
            <rect x={7} y={SIZE - heights[2]} width={5} height={heights[2]} fill="#745206" />
            <rect x={13} y={SIZE - heights[3]} width={5} height={heights[3]} fill="#745206" />
            <rect x={19} y={SIZE - heights[4]} width={5} height={heights[4]} fill="#745206" />
            <rect x={25} y={SIZE - heights[5]} width={5} height={heights[5]} fill="#745206" />
            <rect x={31} y={SIZE - heights[6]} width={5} height={heights[6]} fill="#745206" />
            <rect x={37} y={SIZE - heights[7]} width={5} height={heights[7]} fill="#745206" />
        </svg>
    );
};

export default ManaValueChart;
