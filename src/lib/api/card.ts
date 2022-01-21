import axios from 'axios';
import Color from '../../definitions/Color';
import CardResponse from '../../definitions/dto/CardResponse';
import Format from '../../definitions/Format';
import Identity from '../../definitions/Identity';

const ENDPOINT = 'https://api.scryfall.com/cards/search?q='

const getApiFormat = (format: Format) => (format === 'historic') ? 'historicbrawl' : 'brawl';
const getColorString = (colors: Color[]) => (colors.length > 0) ? colors.join('') : 'c';

export const getCommander = async (identity: Identity): Promise<CardResponse> => {
    const { format, colors } = identity;
    const apiFormat = getApiFormat(format);
    const colorString = getColorString(colors);

    const cardQuery = `id=${colorString}+f:${apiFormat}+(is:commander OR t:planeswalker)+game:arena`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getSpells = async (identity: Identity, query?: string): Promise<CardResponse> => {
    const { format, colors } = identity;
    const apiFormat = getApiFormat(format);
    const colorString = getColorString(colors);

    const cardQuery = `id<=${colorString}+f:${apiFormat}+game:arena+-t:land`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getBasicLandArt = async (color: Color): Promise<CardResponse> => {
    const cardQuery = `id=${color}+f:brawl+t:land+t:basic+game:arena&unique=art`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};

export const getNonBasicLands = async (colors: Color[], format: Format): Promise<CardResponse> => {
    const colorString = getColorString(colors);
    const apiFormat = getApiFormat(format);

    const cardQuery = `id<=${colorString}+f:${apiFormat}+t:land+game:arena`;

    const response = await axios.get(`${ENDPOINT}${cardQuery}`);
    return response.data;
};