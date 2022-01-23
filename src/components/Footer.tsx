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
            <span className="u-txt--24 u-txt--heading u-txt--weight-black u-txt--color-black">
                Total cards: {allCards.length}/{cardCount}
            </span>
        </div>
    );
};

export default Footer;
