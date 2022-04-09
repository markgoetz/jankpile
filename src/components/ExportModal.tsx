import React from 'react';
import { useSelector } from 'react-redux';
import { deckToArena } from '../lib/translation/cardTranslations';
import { selectCommander } from '../redux-modules/commander';
import { selectLandArtByColor, selectBasicLandCounts, selectNonBasicLands } from '../redux-modules/lands';
import { selectSpellList } from '../redux-modules/spells';
import Heading from './common/Heading';
import Modal from './common/Modal';

type Props = {
    isOpen: boolean,
    onClose: () => void,
};

const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const commander = useSelector(selectCommander);
    const spells = useSelector(selectSpellList);
    const nonbasics = useSelector(selectNonBasicLands);
    const basicCounts = useSelector(selectBasicLandCounts);
    const basicArts = useSelector(selectLandArtByColor);

    const value = commander != null
        ? deckToArena({commander, spells, nonbasics, basicCounts, basicArts })
        : '';

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="small">
            <Heading size="large" tag="h1">Export to Arena</Heading>
            <textarea value={value} readOnly className="c-textarea u-width--100-pct" rows={40} />
        </Modal>
    );
};

export default ExportModal;
