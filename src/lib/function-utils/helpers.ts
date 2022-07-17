export const createResponse = (statusCode: number, data: unknown) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    };
};

export const parseFormat = (params: Record<string, string | undefined>) => (params.format === 'historic') ? 'historicbrawl' : 'brawl';
export const parseColors = (params: Record<string, string | undefined>) => {
    if (params.colors === '') {
        return 'c';
    }

    const colors = params.colors?.split(',') ?? [];
    return (colors.length > 0) ? colors.join('') : 'c';
}

const API_ENDPOINT = 'https://api.scryfall.com/cards/search?q=';
export const getEndpoint = (query: string, page: number = 1) => `${API_ENDPOINT}${query}&page=${page}`;

export const SET_ENDPOINT = 'https://api.scryfall.com/sets'
