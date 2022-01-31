import ScryfallCard from './ScryfallCard';

type CardResponse = {
    object: string,
    total_cards: number,
    has_more: boolean,
    data: ScryfallCard[],
};

export default CardResponse;
