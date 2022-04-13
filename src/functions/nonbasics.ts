import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import ScryfallList from '../definitions/dto/ScryfallList';
import { createResponse, getEndpoint, parseColors, parseFormat } from '../lib/function-utils/helpers';
import { fullCardToLand } from '../lib/function-utils/cardTranslations';

const handler: Handler = async(event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);
    const query = params.q ?? '';

    const queryPieces = [
        `id<=${colorString}`,
        `f:${format}`,
        't:land',
        '-t:basic',
        'game:arena',
    ];

    if (query.trim() !== '') {
        queryPieces.push(`(o:${query} OR name:${query})`);
    }

    const cardQuery = queryPieces.join('+');

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<ScryfallList>;
        const parsedResponse = response.data.data.map(fullCardToLand);
        return createResponse(200, parsedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
