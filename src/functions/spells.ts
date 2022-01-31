import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import CardResponse from '../definitions/dto/CardResponse';
import { createResponse, getEndpoint, parseColors, parseFormat } from '../lib/function-utils/helpers';
import { fullCardToSpell } from '../lib/translation/cardTranslations';

const handler: Handler = async(event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);
    const manaValues = params.mv?.split(',') ?? [];
    const query = params.q ?? '';

    const queryPieces = [
        `id<=${colorString}`,
        `f:${format}`,
        'game:arena',
        '-t:land'
    ];

    if (manaValues.length > 0) {
        queryPieces.push(`(${manaValues.map(v => `mv:${v}`).join(' OR ')})`);
    }

    if (query.trim() !== '') {
        queryPieces.push(`(o:${query} OR name:${query})`);
    }

    const cardQuery = queryPieces.join('+');
    console.log(cardQuery);

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<CardResponse>;
        const parsedResponse = response.data.data.map(fullCardToSpell);
        return createResponse(200, parsedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
