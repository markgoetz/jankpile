import Card from "../../definitions/Card";
import Color from "../../definitions/Color";

export const cardToArena = (card: Card, count = 1): string => {
    return `${count} ${card.frontFace.name} (${card.setCode}) ${card.cardNumber}`;
};

type DeckToArenaParams = {
    commander: Card,
    spells: Card[],
    nonbasics: Card[],
    basicCounts: Record<Color, number>,
    basicArts: Record<Color, Card | null>,
}

export const deckToArena = (params: DeckToArenaParams) => {
    const { commander, spells, nonbasics, basicCounts, basicArts } = params;

    let deck = `Commander\n${cardToArena(commander)}\n\nDeck\n`;

    spells.forEach(spell => deck = deck + `${cardToArena(spell)}\n`);
    nonbasics.forEach(land => deck = deck + `${cardToArena(land)}\n`);
    const colors = Object.keys(basicCounts) as Color[];
    colors.forEach(c => {
        const art = basicArts[c];
        if (art != null) {
            deck = deck + `${cardToArena(art, basicCounts[c])}\n`;
        }
    });

    return deck;
}
