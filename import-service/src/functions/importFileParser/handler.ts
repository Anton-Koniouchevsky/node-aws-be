import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';

export const main: LambdaFunction = (event) => {
  console.log('importFileParser invoked with event: ', event);

  return tryCatch(async () => {
    return 'boo'
  });
};
