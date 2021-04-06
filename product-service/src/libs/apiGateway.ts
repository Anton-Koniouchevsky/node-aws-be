import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export type LambdaFunction = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

const formatJSONResponse = (response: any, statusCode = 200): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }
}

export const tryCatch = async (handler: Function): Promise<APIGatewayProxyResult> => {
  try {
    const result = await handler();

    return formatJSONResponse(result);
  } catch(err) {
    console.log(err.message);

    return formatJSONResponse({ errorMessage: err.message }, 404);
  }
}