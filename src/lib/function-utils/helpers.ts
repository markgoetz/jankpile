export const createResponse = (statusCode: number, data: unknown) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    };
};

export const parseFormat = (params: Record<string, string | undefined>) => (params.format === 'historic') ? 'historicbrawl' : 'brawl';
export const parseColors = (params: Record<string, string | undefined>) => {
    const colors = params.colors?.split(',') ?? [];
    return (colors.length > 0) ? colors.join('') : 'c';
}

const API_ENDPOINT = 'https://api.scryfall.com/cards/search?q=';
export const getEndpoint = (query: string) => `${API_ENDPOINT}${query}`;
