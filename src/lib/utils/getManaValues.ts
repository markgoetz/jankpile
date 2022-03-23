import Card from "../../definitions/Card";

const getManaValues = (deck: Card[], max: number) => {
    return deck.reduce(
        (prevDeck, card) => {
            const manaValue = Math.min(card.manaValue, max);

            if (prevDeck[manaValue] != null) {
                prevDeck[manaValue]++;
            } else {
                prevDeck[manaValue] = 1;
            }

            return prevDeck;
        },
        {} as Record<number, number>,
    );
};

export default getManaValues;
