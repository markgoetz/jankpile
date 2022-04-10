import React from 'react';
import Card from '../../definitions/Card';
import getManaValues from '../../lib/utils/getManaValues';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Modal from '../common/Modal';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    spells: Card[],
};

const MAX_MANA_VALUE = 7;

const ManaCurveModal: React.FC<Props> = ({ isOpen, onClose, spells }) => {
    const manaValues = getManaValues(spells, MAX_MANA_VALUE);
    const creatureCount = spells.filter(spell => spell.frontFace.type.includes('Creature')).length;
    const nonCreatureCount = spells.filter(spell => !spell.frontFace.type.includes('Creature')).length;
    const maxManaValue = Math.max(...Object.values(manaValues));
    const lengths = Object.keys(manaValues).reduce(
        (prevLengths, manaValue) => ({
            ...prevLengths,
            [manaValue]: manaValues[Number(manaValue)] / maxManaValue,
        }),
        {} as Record<number, number>,
    );

    return (
        <Modal size="small" isOpen={isOpen} onClose={onClose}>
            <Heading tag="h1" size="large">Mana Curve</Heading>
            <div className="u-vr--x4" />
            <div className="u-center">
                <table className="c-table u-txt--color-primary u-txt--20">
                    <tbody>
                        <tr>
                            <th scope="row" className="c-table__cell u-txt--align-right">Creatures</th>
                            <td className="c-table__cell u-txt--align-left">{creatureCount}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="c-table__cell u-txt--align-right">Noncreatures</th>
                            <td className="c-table__cell u-txt--align-left">{nonCreatureCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="u-vr--x2" />
            <div className="u-center">
                <table className="c-table c-table--full-width u-txt--color-primary u-txt--20">
                    <tbody>
                        {[1, 2, 3, 4, 5, 6, 7].map(
                            value => (
                                <tr key={value}>
                                    <td className="c-table__cell u-txt--align-right">Cost&nbsp;{value}</td>
                                    <td className="c-table__cell c-table__cell--full-width u-txt--align-left">
                                        <span className="o-h-list">
                                            <span>{manaValues[Number(value)] ?? 0}</span>
                                            <span className="c-bar">
                                                <span className="c-bar__inner" style={{width: `${lengths[Number(value)] * 100}%`}} />
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div className="u-vr--x4" />
            <div className="u-center">
                <Button type="button" onClick={onClose}>Close</Button>
            </div>
        </Modal>
    );
};

export default ManaCurveModal;
