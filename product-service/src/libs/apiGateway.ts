import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

type Handler<TEvent = any> = (event: TEvent) => Promise<APIGatewayProxyResult>;
export type LambdaFunction = Handler<APIGatewayProxyEvent>;

type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & { body: T }
export type TypedLambdaFunction<T> = Handler<ValidatedAPIGatewayProxyEvent<T>>;

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

export const tryCatch = async (handler: Function, ...args: any[]): Promise<APIGatewayProxyResult> => {
  try {
    const result = await handler(...args);

    return formatJSONResponse(result);
  } catch(err) {
    console.log(err.message);

    return formatJSONResponse({ errorMessage: err.message }, err.statusCode || 500);
  }
}