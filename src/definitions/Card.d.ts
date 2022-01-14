import CardType from "./CardType";

type Card = {
    name: string,
    type: CardType,
    imageUrl: string,
    setCode: string,
    cardNumber: string,
};

export default Card;

export type Spell = Card & {
    type: Omit<CardType, 'land'>;
};

export type Commander = Card & {
    type: 'creature' | 'planeswalker';
};
