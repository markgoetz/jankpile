import CardFace from "./CardFace";

type Card = {
    id: string,
    frontFace: CardFace,
    backFace?: CardFace,
    manaValue: number,
    setCode: string,
    cardNumber: string,
};

export default Card;
