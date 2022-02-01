import Card from "../../definitions/Card";

export const cardToArena = (card: Card, count = 1): string => {
    return `${count} ${card.name} (${card.setCode}) ${card.cardNumber}`;
};
