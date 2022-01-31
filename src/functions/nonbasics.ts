import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import CardResponse from '../definitions/dto/CardResponse';
import { createResponse, getEndpoint, parseColors, parseFormat } from '../lib/function-utils/helpers';
import { fullCardToLand } from '../lib/translation/cardTranslations';

const handler: Handler = async(event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);

    const cardQuery = `id<=${colorString}+f:${format}+t:land+-t:basic+game:arena`;

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<CardResponse>;
        const parsedResponse = response.data.data.map(fullCardToLand);
        return createResponse(200, parsedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
