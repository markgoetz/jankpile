import axios from 'axios';
import CardResponse from '../../definitions/dto/CardResponse';

export const getCommander = async (colors: string[]): Promise<CardResponse> => {
    const cardQuery = `id=${colors.join('+')}+f:brawl+is:commander`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getSpells = async (colors: string[], query?: string): Promise<CardResponse> => {
    const cardQuery = `id<=${colors.join('+')}+f:brawl`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getBasicLands = async (color: string): Promise<CardResponse> => {
    const cardQuery = `id=${color}+f:brawl+t:land+t:basic+game=arena&unique=art`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getNonBasicLands = async (colors: string[]): Promise<CardResponse> => {
    /* https://scryfall.com/search?as=grid&order=name&page=2&q=swamp+t%3Aland+t%3Abasic+game%3Aarena&unique=art */
    const cardQuery = `id<=${colors.join('+')}+f:brawl`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};