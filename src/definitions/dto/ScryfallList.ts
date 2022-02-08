import ScryfallCard from './ScryfallCard';

type ScryfallList = {
    object: string,
    total_cards: number,
    has_more: boolean,
    data: ScryfallCard[],
};

export default ScryfallList;
