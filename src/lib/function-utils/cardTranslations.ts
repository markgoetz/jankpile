import Card from "../../definitions/Card";
import CardFace from "../../definitions/CardFace";
import ScryfallCard from "../../definitions/dto/ScryfallCard";

const getFrontFace = (card: ScryfallCard): CardFace => {
    if (card.card_faces != null) {
        const cardFace = card.card_faces[0];

        if (cardFace.image_uris == null) {
            throw new Error('Card does not have any image URIs');
        }

        return {
            name: cardFace.name,
            description: cardFace.oracle_text,
            artist: cardFace.artist,
            fullImageUri: cardFace.image_uris.small,
            artImageUri: cardFace.image_uris.art_crop,
            manaValue: cardFace.cmc,
            pips: cardFace.mana_cost,
            power: cardFace.power,
            toughness: cardFace.toughness,
        }
    }

    if (card.image_uris == null) {
        throw new Error('Card does not have any image URIs');
    }

    return {
        name: card.name,
        description: card.oracle_text,
        artist: card.artist ?? 'Unknown',
        fullImageUri: card.image_uris.small,
        artImageUri: card.image_uris.art_crop,
        manaValue: card.cmc,
        pips: card.mana_cost as string,
        power: card.power,
        toughness: card.toughness,
    }
};

const getBackFace = (card: ScryfallCard): CardFace | undefined => {
    if (card.card_faces != null) {
        const cardFace = card.card_faces[1];

        if (cardFace.image_uris == null) {
            throw new Error('Card does not have any image URIs');
        }

        return {
            name: cardFace.name,
            description: cardFace.oracle_text,
            artist: cardFace.artist,
            fullImageUri: cardFace.image_uris.small,
            artImageUri: cardFace.image_uris.art_crop,
            manaValue: cardFace.cmc,
            pips: cardFace.mana_cost,
            power: cardFace.power,
            toughness: cardFace.toughness,
        }
    }

    return undefined;
};

export const fullCardToCommander = (card: ScryfallCard): Card => {
    if (!card.type_line.toLowerCase().includes('legendary')) {
        throw new Error(`fullCardToCommander is not compatible with type line ${card.type_line}`);
    }

    return {
        id: card.id,
        frontFace: getFrontFace(card),
        backFace: getBackFace(card),
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
    };
};

export const fullCardToSpell = (card: ScryfallCard): Card => {
    if (card.type_line.toLowerCase().includes('land')) {
        throw new Error(`fullCardToSpell is not compatible with type line ${card.type_line}`);
    }

    return {
        id: card.id,
        frontFace: getFrontFace(card),
        backFace: getBackFace(card),
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
    };
};

export const fullCardToLand = (card: ScryfallCard): Card => {
    if (!card.type_line.toLowerCase().includes('land')) {
        throw new Error(`fullCardToLand is not compatible with type line ${card.type_line}`);
    }

    return {
        id: card.id,
        frontFace: getFrontFace(card),
        backFace: getBackFace(card),
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
    };
};
