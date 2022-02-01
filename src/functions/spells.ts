import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import CardResponse from '../definitions/dto/CardResponse';
import { createResponse, getEndpoint, parseColors, parseFormat } from '../lib/function-utils/helpers';
import { fullCardToSpell } from '../lib/translation/cardTranslations';

const API_RESULTS = 175;
const PAGE_RESULTS = 25;
const CLIENT_PAGES_PER_SERVER_PAGE = API_RESULTS / PAGE_RESULTS;

const handler: Handler = async(event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);
    const manaValues = params.mv?.split(',') ?? [];
    const query = params.q ?? '';
    const requestedPage = parseInt(params.p ?? '0', 10);

    const serverPage = Math.floor(requestedPage / CLIENT_PAGES_PER_SERVER_PAGE) + 1;
    const clientSplice = requestedPage % CLIENT_PAGES_PER_SERVER_PAGE;

    const queryPieces = [
        `id<=${colorString}`,
        `f:${format}`,
        'game:arena',
        '-t:land',
        `page:${serverPage}`,
    ];

    if (manaValues.length > 0) {
        queryPieces.push(`(${manaValues.map(v => `mv:${v}`).join(' OR ')})`);
    }

    if (query.trim() !== '') {
        queryPieces.push(`(o:${query} OR name:${query})`);
    }

    const cardQuery = queryPieces.join('+');

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<CardResponse>;
        const parsedResponse = response.data.data.map(fullCardToSpell);
        const splicedResponse = parsedResponse.splice(clientSplice * PAGE_RESULTS, PAGE_RESULTS);
        return createResponse(200, splicedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
