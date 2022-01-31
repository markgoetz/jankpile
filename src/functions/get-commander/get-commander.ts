import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import CardResponse from '../../definitions/dto/CardResponse';
import { fullCardToCommander } from '../../lib/translation/cardTranslations';
import { createResponse, parseFormat, parseColors, getEndpoint } from '../../lib/function-utils/helpers';

const handler: Handler = async (event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);

    const cardQuery = `id=${colorString}+f:${format}+(is:commander OR t:planeswalker)+game:arena`;

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<CardResponse>;
        const parsedResponse = response.data.data.map(fullCardToCommander);
        return createResponse(200, parsedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
