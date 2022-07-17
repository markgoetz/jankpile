import axios from 'axios';
import { ENDPOINTS } from '../consts';

export const getSetNames = async (): Promise<Record<string, string>> => {
    const response = await axios.get(ENDPOINTS.SETS);
    return response.data as Record<string, string>;
};
