import 'source-map-support/register';

import { formatJSONResponse, LambdaFunction } from '@libs/apiGateway';
const axios = require('axios');


export const getActivity: LambdaFunction = async (event) => {
  try {
    const request = await axios.get('http://www.boredapi.com/api/activity/');

    return formatJSONResponse({ message: request.data });
  } catch(err) {
    console.log('getActivity', err, event);
  
    return formatJSONResponse({ errorMessage: err.message }, 404);
  }
}
