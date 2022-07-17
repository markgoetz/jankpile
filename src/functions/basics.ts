import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import ScryfallList from '../definitions/dto/ScryfallList';
import { createResponse, getEndpoint } from '../lib/function-utils/helpers';
import { fullCardToLand } from '../lib/function-utils/cardTranslations';
import ScryfallCard from '../definitions/dto/ScryfallCard';

const handler: Handler = async(event, context) => {
    const params = event.queryStringParameters ?? {};

    const color = params.color;
    const isSnow = params.isSnow != null;

    const snowQuery = isSnow ? 't:snow' : '-t:snow';
    const cardQuery = `id=${color}+f:brawl+t:land+${snowQuery}+t:basic+game:arena&unique=art`;

    try {
        const response = await axios.get(getEndpoint(cardQuery)) as AxiosResponse<ScryfallList<ScryfallCard>>;
        const parsedResponse = response.data.data.map(fullCardToLand);
        return createResponse(200, parsedResponse);
    } catch (e) {
        return createResponse(500, e);
    }
};

export { handler };
