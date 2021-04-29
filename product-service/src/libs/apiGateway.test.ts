import { tryCatch } from './apiGateway';
import HandlerError from './handlerError';

describe('#tryCatch', () => {
  test('should return 200 response if handler is resolved', async () => {
    const callbackResult = 1;

    const result = await tryCatch(() => Promise.resolve(callbackResult));

    expect(result).toMatchObject({
      statusCode: 200,
      body: '1',
    });
  });

  test('should return passed status code if present', async () => {
    const result = await tryCatch(() => Promise.reject(new HandlerError(418, 'error message')));

    expect(result).toMatchObject({
      statusCode: 418,
      body: JSON.stringify({ errorMessage: 'error message' }),
    });
  });

  test('should return 500 response if handler is rejected without status code', async () => {
    const result = await tryCatch(() => Promise.reject(new Error('error message')));

    expect(result).toMatchObject({
      statusCode: 500,
      body: JSON.stringify({ errorMessage: 'error message' }),
    });
  });
});
