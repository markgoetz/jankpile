import Card from './Card';

type CardResponse = {
    object: string,
    total_cards: number,
    has_more: boolean,
    data: Card[],
};

export default CardResponse;
