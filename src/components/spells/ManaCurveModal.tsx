import React from 'react';
import Card from '../../definitions/Card';
import getManaValues from '../../lib/utils/getManaValues';
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
            <table className="u-center">
                <tbody>
                    <tr>
                        <th scope="row">Creatures</th>
                        <td>{creatureCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">Noncreatures</th>
                        <td>{nonCreatureCount}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    {Object.keys(manaValues).map(
                        value => (
                            <tr key={value}>
                                <td>Cost {value}</td>
                                <td>{manaValues[Number(value)]}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </Modal>
    );
};

export default ManaCurveModal;
