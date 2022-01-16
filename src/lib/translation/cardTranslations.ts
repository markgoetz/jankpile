import Card from "../../definitions/Card";
import FullCard from "../../definitions/dto/FullCard";

const getImageUris = (card: FullCard) => {
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

export const fullCardToCommander = (card: FullCard): Card => {
    if (!card.type_line.toLowerCase().includes('legendary')) {
        throw new Error(`fullCardToCommander is not compatible with type line ${card.type_line}`);
    }

    const imageUris = getImageUris(card);

    return {
        id: card.id,
        name: card.name,
        fullImageUri: imageUris.small,
        artImageUri: imageUris.art_crop,
        setCode: card.set,
        cardNumber: card.collector_number,
        manaValue: card.cmc,
    };
};
