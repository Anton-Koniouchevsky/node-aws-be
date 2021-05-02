import type { APIGatewayProxyEvent, APIGatewayProxyResult, S3Event, Handler } from "aws-lambda";

export type LambdaFunction = Handler<APIGatewayProxyEvent>;
export type S3EventLambdaFunction = Handler<S3Event, void>;

const formatJSONResponse = (response: any, statusCode = 200): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      "Access-Control-Allow-Headers" : "Content-Type",
    },
  }
}

export const tryCatch = async (handler: Function, ...args: any[]): Promise<APIGatewayProxyResult> => {
  try {
    const result = await handler(...args);

    return formatJSONResponse(result);
  } catch(err) {
    console.log(err);

    return formatJSONResponse({ errorMessage: err.message }, err.statusCode || 500);
  }
}