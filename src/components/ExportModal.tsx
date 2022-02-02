import React from 'react';
import { useSelector } from 'react-redux';
import { cardToArena } from '../lib/translation/cardTranslations';
import { selectAllCards } from '../redux-modules/store';
import Modal from './common/Modal';

type Props = {
    isOpen: boolean,
    onClose: () => void,
};

const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const deck = useSelector(selectAllCards);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <textarea value={deck.map(card => cardToArena(card)).join('\n')} readOnly />
        </Modal>
    );
};

export default ExportModal;
