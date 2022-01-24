type Card = {
    id: string,
    name: string,
    description?: string,
    artist: string,
    fullImageUri: string,
    artImageUri: string,
    setCode: string,
    cardNumber: string,
    manaValue: number,
    pips: string,
};

export default Card;
