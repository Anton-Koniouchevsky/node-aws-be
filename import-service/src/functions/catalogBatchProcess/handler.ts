import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';

export const main: SQSHandler = (event) => {
  console.log('catalogBatchProcess invoked with event: ', event);
};
