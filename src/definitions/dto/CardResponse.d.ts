import FullCard from './FullCard';

type CardResponse = {
    object: string,
    total_cards: number,
    has_more: boolean,
    data: FullCard[],
};

export default CardResponse;
