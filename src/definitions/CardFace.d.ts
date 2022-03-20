type CardFace = {
    name: string,
    description?: string,
    artist: string,
    fullImageUri: string,
    artImageUri: string,
    manaValue: number,
    pips: string,
    power?: string,
    toughness?: string,
    loyalty?: string,
};

export default CardFace;
