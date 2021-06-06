import 'source-map-support/register';

import type {
  APIGatewayAuthorizerHandler,
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from "aws-lambda"


const generatePolicy = (principalId: string, resource: string, effect: 'Allow' | 'Deny'): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
};


export const main: APIGatewayAuthorizerHandler = (event: APIGatewayTokenAuthorizerEvent, _, callback) => {
  console.log('basicAuthorizer', event);

  try {
    if (event.type !== 'TOKEN') {
      throw new Error('Wrong authorizer type');
    }

    const [authSchema, encoded] = event.authorizationToken.split(' ');
    if (authSchema.toLowerCase() !== 'basic') {
      throw new Error(`Wrong auth schema - ${authSchema}`);
    }
  
    const decoded = Buffer.from(encoded, 'base64');
    const [username, password] = decoded.toString('utf-8').split(':');

    console.log('basicAuthorizer', 'username: ', username, 'password: ', password);

    const isValid = !!process.env[username] && process.env[username] === password;
    const policy = generatePolicy(username, event.methodArn, isValid ? 'Allow' : 'Deny');

    callback(null, policy);
  } catch(err) {
    console.log('basicAuthorizer', err);

    callback('Unauthorized');
  }
};
