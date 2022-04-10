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

    return (
        <Modal size="small" isOpen={isOpen} onClose={onClose}>
            <Heading tag="h1" size="large">Mana Curve</Heading>
            <div className="u-vr--x4" />
            <div className="u-center">
                <table className="c-table u-txt--color-black">
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
                <table className="c-table u-txt--color-black">
                    <tbody>
                        {Object.keys(manaValues).map(
                            value => (
                                <tr key={value}>
                                    <td className="c-table__cell u-txt--align-right">Cost {value}</td>
                                    <td className="c-table__cell u-txt--align-left">{manaValues[Number(value)]}</td>
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
