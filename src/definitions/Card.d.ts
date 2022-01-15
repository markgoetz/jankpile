import CardType from "./CardType";

type Card = {
    id: number,
    name: string,
    type: CardType,
    imageUrl: string,
    setCode: string,
    cardNumber: string,
    manaValue: number,
};

export default Card;

export type SpellCard = Card & {
    type: Omit<CardType, 'land'>;
};

export type CommanderCard = Card & {
    type: 'creature' | 'planeswalker';
};
