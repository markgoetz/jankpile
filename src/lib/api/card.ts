import axios from 'axios';
import Card from '../../definitions/Card';
import CardResponse from '../../definitions/CardResponse';
import Color from '../../definitions/Color';
import Format from '../../definitions/Format';
import Identity from '../../definitions/Identity';
import { ENDPOINTS } from '../consts';

export const getCommander = async (identity: Identity): Promise<Card[]> => {
    const { format, colors } = identity;
    const colorString = colors.join(',');

    const response = await axios.get(ENDPOINTS.COMMANDER + `?colors=${colorString}&format=${format}`);
    return response.data;
};

export type SpellQueryParams = {
    identity: Identity,
    query?: string,
    manaValues?: number[],
    page: number,
}

export const getSpells = async (params: SpellQueryParams): Promise<CardResponse> => {
    const { identity, query = '', manaValues = [], page } = params;
    const { format, colors } = identity;

    const searchParams = new URLSearchParams();
    searchParams.set('colors', colors.join(','));
    searchParams.set('format', format);

    if (query !== '') {
        searchParams.set('q', query);
    }

    if (manaValues.length > 0) {
        searchParams.set('mv', manaValues.join(','));
    }
    
    if (page !== 0) {
        searchParams.set('p', page.toString());
    }

    const response = await axios.get(`${ENDPOINTS.SPELLS}?${searchParams.toString()}`);
    return response.data;
};

export const getBasicLandArt = async (color: Color, isSnow: Boolean): Promise<Card[]> => {
    const snowQuery = isSnow ? '&isSnow' : '';
    const response = await axios.get(`${ENDPOINTS.BASIC_ART}?color=${color}${snowQuery}`);
    return response.data;
};

export const getNonBasicLands = async (colors: Color[], format: Format, query: string): Promise<Card[]> => {
    const response = await axios.get(`${ENDPOINTS.NONBASICS}?colors=${colors.join(',')}&format=${format}&q=${query}`);
    return response.data;
};