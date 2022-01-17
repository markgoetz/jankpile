import axios from 'axios';
import Color from '../../definitions/Color';
import CardResponse from '../../definitions/dto/CardResponse';
import Format from '../../definitions/Format';

const ENDPOINT = 'https://api.scryfall.com/cards/search?q='

const getApiFormat = (format: Format) => (format === 'historic') ? 'historicbrawl' : 'brawl';

export const getCommander = async (format: Format, colors: Color[]): Promise<CardResponse> => {
    const apiFormat = getApiFormat(format);

    const cardQuery = `id=${colors.join('')}+f:${apiFormat}+(is:commander OR t:planeswalker)+game:arena`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getSpells = async (format: Format, colors: Color[], query?: string): Promise<CardResponse> => {
    const apiFormat = getApiFormat(format);
    const cardQuery = `id<=${colors.join('+')}+f:${apiFormat}+game:arena`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getBasicLands = async (color: Color): Promise<CardResponse> => {
    const cardQuery = `id=${color}+f:brawl+t:land+t:basic+game:arena&unique=art`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getNonBasicLands = async (colors: Color[]): Promise<CardResponse> => {
    const cardQuery = `id<=${colors.join('+')}+f:brawl+t:land+game:arena`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};