import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export type LambdaFunction = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export const formatJSONResponse = (response: any, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }
}
