import { Handler } from "@netlify/functions";
import { createResponse } from "../../lib/function-utils/helpers";

const handler: Handler = async (event, context) => {
    return createResponse(200, 'hello');
};

export { handler };
