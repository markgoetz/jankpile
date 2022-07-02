import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCards } from '../redux-modules/store';
import { selectFormat } from '../redux-modules/identity';
import { CARD_COUNT_BY_FORMAT } from '../lib/consts';
import Button from './common/Button';

type Props = {
    onExportClick: () => void,
};

const ExportForm: React.FC<Props> = ({ onExportClick }) => {
    const allCards = useSelector(selectAllCards);
    const format = useSelector(selectFormat);
    const cardCount = CARD_COUNT_BY_FORMAT[format];

    return (
        <div className="c-form">
            <div className="o-h-list o-h-list--x2 o-h-list--center">
                <span className="u-txt--24 u-txt--heading u-txt--weight-black u-txt--color-black">
                    Total cards: {allCards.length}/{cardCount}
                </span>
                <Button type="button" disabled={allCards.length !== cardCount} onClick={onExportClick}>
                    Export to Arena
                </Button>
            </div>
        </div>
    );
};

export default ExportForm;
