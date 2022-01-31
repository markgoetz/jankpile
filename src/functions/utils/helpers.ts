export const createResponse = (statusCode: number, data: unknown) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    };
};
