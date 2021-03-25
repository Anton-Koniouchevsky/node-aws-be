import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export type LambdaFunction = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export const formatJSONResponse = (response: Record<string, unknown>, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response)
  }
}
