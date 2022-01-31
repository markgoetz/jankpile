import Card from "../../definitions/Card";
import ScryfallCard from "../../definitions/dto/ScryfallCard";

const getImageUris = (card: ScryfallCard) => {
    if (card.image_uris != null) {
        return card.image_uris;
    }

    if (card.card_faces == null || card.card_faces.length === 0) {
        throw new Error('Card does not have any image URIs');
    }

    const faceImageUriMaps = card.card_faces.filter(face => face.image_uris != null);

    if (faceImageUriMaps[0].image_uris == null || faceImageUriMaps.length === 0) {
        throw new Error('Card does not have any image URIs');
    }

    return faceImageUriMaps[0].image_uris;
};

export const fullCardToCommander = (card: ScryfallCard): Card => {
    if (!card.type_line.toLowerCase().includes('legendary')) {
        throw new Error(`fullCardToCommander is not compatible with type line ${card.type_line}`);
    }

    const imageUris = getImageUris(card);

    const name = card.card_faces ? card.card_faces[0].name : card.name;
    const pips = card.card_faces ? card.card_faces[0].mana_cost : card.mana_cost as string;
    const description = card.card_faces
        ? card.card_faces.map(face => face.oracle_text).join('\n')
        : card.oracle_text;

    return {
        id: card.id,
        name,
        description,
        artist: card.artist || 'Unknown',
        fullImageUri: imageUris.small,
        artImageUri: imageUris.art_crop,
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
        manaValue: card.cmc,
        pips,
    };
};

export const fullCardToSpell = (card: ScryfallCard): Card => {
    if (card.type_line.toLowerCase().includes('land')) {
        throw new Error(`fullCardToSpell is not compatible with type line ${card.type_line}`);
    }

    const imageUris = getImageUris(card);

    const name = card.card_faces ? card.card_faces[0].name : card.name;
    const pips = card.card_faces ? card.card_faces[0].mana_cost : card.mana_cost as string;
    const description = card.card_faces
        ? card.card_faces.map(face => face.oracle_text).join('\n')
        : card.oracle_text;

    return {
        id: card.id,
        name,
        description,
        artist: card.artist || 'Unknown',
        fullImageUri: imageUris.small,
        artImageUri: imageUris.art_crop,
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
        manaValue: card.cmc,
        pips,
    };
};

export const fullCardToLand = (card: ScryfallCard): Card => {
    if (!card.type_line.toLowerCase().includes('land')) {
        throw new Error(`fullCardToLand is not compatible with type line ${card.type_line}`);
    }

    const imageUris = getImageUris(card);

    const name = card.card_faces ? card.card_faces[0].name : card.name;
    const description = card.card_faces
        ? card.card_faces.map(face => face.oracle_text).join('\n')
        : card.oracle_text;

    return {
        id: card.id,
        name,
        description,
        artist: card.artist || 'Unknown',
        fullImageUri: imageUris.small,
        artImageUri: imageUris.art_crop,
        setCode: card.set.toUpperCase(),
        cardNumber: card.collector_number,
        manaValue: card.cmc,
        pips: '',
    };
};

export const cardToArena = (card: Card, count = 1): string => {
    return `${count} ${card.name} (${card.setCode}) ${card.cardNumber}`;
};
