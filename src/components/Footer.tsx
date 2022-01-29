import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCards } from '../redux-modules/store';
import { selectFormat } from '../redux-modules/identity';
import { CARD_COUNT_BY_FORMAT } from '../lib/consts';

const Footer: React.FC = () => {
    const allCards = useSelector(selectAllCards);
    const format = useSelector(selectFormat);
    const cardCount = CARD_COUNT_BY_FORMAT[format];

    return (
        <div className="c-footer">
            <div className="o-h-list o-h-list--x2 o-h-list--center">
                <span className="u-txt--24 u-txt--heading u-txt--weight-black u-txt--color-black">
                    Total cards: {allCards.length}/{cardCount}
                </span>
                <button type="button" disabled={allCards.length !== cardCount} className="c-btn">
                    Export to Arena
                </button>
            </div>
        </div>
    );
};

export default Footer;
