import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getActivity`,
  events: [
    {
      http: {
        method: 'get',
        path: 'activity',
      }
    }
  ]
}
