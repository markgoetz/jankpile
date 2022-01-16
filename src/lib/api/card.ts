import axios from 'axios';
import Color from '../../definitions/Color';
import CardResponse from '../../definitions/dto/CardResponse';
import Format from '../../definitions/Format';

const getApiFormat = (format: Format) => (format === 'historic') ? 'historicbrawl' : 'brawl';


export const getCommander = async (format: Format, colors: Color[]): Promise<CardResponse> => {
    const apiFormat = getApiFormat(format);

    const cardQuery = `id:${colors.join('+')}+f:${apiFormat}+is:commander+game:arena`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?q=${cardQuery}`);
    return response.data;
};

export const getSpells = async (format: Format, colors: Color[], query?: string): Promise<CardResponse> => {
    const apiFormat = getApiFormat(format);
    const cardQuery = `id<=${colors.join('+')}+f:${apiFormat}+game:arena`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getBasicLands = async (color: Color): Promise<CardResponse> => {
    const cardQuery = `id=${color}+f:brawl+t:land+t:basic+game:arena&unique=art`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};

export const getNonBasicLands = async (colors: Color[]): Promise<CardResponse> => {
    /* https://scryfall.com/search?as=grid&order=name&page=2&q=swamp+t%3Aland+t%3Abasic+game%3Aarena&unique=art */
    const cardQuery = `id<=${colors.join('+')}+f:brawl+t:land+game:arena`;

    const response = await axios.get(`https://api.scryfall.com/cards/search?${cardQuery}`);
    return response.data;
};