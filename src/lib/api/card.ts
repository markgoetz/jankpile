import axios from 'axios';
import CardResponse from '../../definitions/dto/CardResponse';

export const getCommander = async (colors: string[]): Promise<CardResponse> => {
    const cardQuery = `id=${colors.join('+')}+f:brawl+is:commander`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getCards = async (colors: string[], query?: string): Promise<CardResponse> => {
    const cardQuery = `id=${colors.join('+')}+f:brawl`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

