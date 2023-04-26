import Card from "../../definitions/Card";
import CardFace from "../../definitions/CardFace";
import ScryfallCard from "../../definitions/dto/ScryfallCard";

const getFrontFace = (card: ScryfallCard): CardFace => {
    if (card.card_faces != null) {
        const cardFace = card.card_faces[0];

        const imageUris = cardFace.image_uris ?? card.image_uris;
        if (imageUris == null) {
            throw new Error('Card does not have any image URIs');
        }

        return {
            name: cardFace.name,
            type: cardFace.type_line ?? '',
            description: cardFace.oracle_text,
            artist: cardFace.artist,
            fullImageUri: imageUris.normal,
            artImageUri: imageUris.art_crop,
            pips: cardFace.mana_cost,
            power: cardFace.power,
            toughness: cardFace.toughness,
            loyalty: cardFace.loyalty,
        }
    }

    if (card.image_uris == null) {
        throw new Error('Card does not have any image URIs');
    }

    return {
        name: card.name,
        type: card.type_line,
        description: card.oracle_text,
        artist: card.artist ?? 'Unknown',
        fullImageUri: card.image_uris.normal,
        artImageUri: card.image_uris.art_crop,
        pips: card.mana_cost as string,
        power: card.power,
        toughness: card.toughness,
        loyalty: card.loyalty,
    }
};

const getBackFace = (card: ScryfallCard): CardFace | undefined => {
    if (card.card_faces != null) {
        const cardFace = card.card_faces[1];

        const imageUris = cardFace.image_uris ?? card.image_uris;
        if (imageUris == null) {
            throw new Error('Card does not have any image URIs');
        }

        return {
            name: cardFace.name,
            type: cardFace.type_line ?? '',
            description: cardFace.oracle_text,
            artist: cardFace.artist,
            fullImageUri: imageUris.small,
            artImageUri: imageUris.art_crop,
            pips: cardFace.mana_cost,
            power: cardFace.power,
            toughness: cardFace.toughness,
            loyalty: cardFace.loyalty,
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
        manaValue: card.cmc,
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
        manaValue: card.cmc,
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
        manaValue: card.cmc,
    };
};
