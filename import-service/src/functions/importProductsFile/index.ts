import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          arn: 'arn:aws:lambda:eu-west-1:821845795844:function:authorization-service-dev-basicAuthorizer',
          managedExternally: false,
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        }
      }
    }
  ]
}
