import { tryCatch } from './apiGateway';

describe('#tryCatch', () => {
  test('should return 200 response if handler is resolved', async () => {
    const callbackResult = 1;

    const result = await tryCatch(() => Promise.resolve(callbackResult));

    expect(result).toMatchObject({
      statusCode: 200,
      body: '1',
    });
  });

  test('should return 404 response if handler is rejected', async () => {
    const result = await tryCatch(() => Promise.reject(new Error('error message')));

    expect(result).toMatchObject({
      statusCode: 404,
      body: JSON.stringify({ errorMessage: 'error message' }),
    });
  });
});
