import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import ScryfallCard from '../definitions/dto/ScryfallCard';
import ScryfallList from '../definitions/dto/ScryfallList';
import { fullCardToCommander } from '../lib/function-utils/cardTranslations';
import { createResponse, parseFormat, parseColors, getEndpoint } from '../lib/function-utils/helpers';

const handler: Handler = async (event, context) => {
    const params = event.queryStringParameters ?? {};

    const colorString = parseColors(params);
    const format = parseFormat(params);

    const cardQuery = `id=${colorString}+f:${format}+(is:commander OR t:planeswalker)+game:arena`;

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<ScryfallList<ScryfallCard>>;
        const parsedResponse = response.data.data.map(fullCardToCommander);
        return createResponse(200, parsedResponse);
    } catch (e) {
        const err = e as Error;

        if (err.message === 'Request failed with status code 404') {
            return createResponse(200, []);
        }

        return createResponse(500, err.message);
    }
};

export { handler };
