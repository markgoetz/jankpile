import { Handler } from '@netlify/functions';
import axios, { AxiosResponse } from 'axios';
import ScryfallList from '../definitions/dto/ScryfallList';
import ScryfallSet from '../definitions/dto/ScryfallSet';
import { createResponse, SET_ENDPOINT } from '../lib/function-utils/helpers';
import { setListToNameMap } from '../lib/function-utils/setTranslations';

const handler: Handler = async () => {
    try {
        const response = await axios.get(SET_ENDPOINT) as AxiosResponse<ScryfallList<ScryfallSet>>;
        const mappedResponse = setListToNameMap(response.data);
        return createResponse(200, mappedResponse);
    } catch (e) {
        const err = e as Error;
        return createResponse(500, err.message);
    }
};

export { handler };
