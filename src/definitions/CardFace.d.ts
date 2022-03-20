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
};

export default CardFace;
