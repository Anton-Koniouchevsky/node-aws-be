import 'source-map-support/register';

const axios = require('axios');

import { formatJSONResponse, LambdaFunction } from '@libs/apiGateway';


export const getActivity: LambdaFunction = async (event) => {
  try {
    const request = await axios.get('http://www.boredapi.com/api/activity/');

    return formatJSONResponse({ message: request.data });
  } catch(err) {
    console.log('getActivity', err, event);
  
    return formatJSONResponse({ errorMessage: err.message }, 404);
  }
}
