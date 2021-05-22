import { main } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { S3 } from 'aws-sdk';

jest.mock('aws-sdk');

const mockedS3 = S3 as jest.MockedClass<typeof S3>;

describe('#importProductsFile', () => {
  it('should return 500 response if fileName is not passed', async () => {
    const event = {
      queryStringParameters: {
        name: 'not a file name'
      }
    } as unknown;

    const result = await main(<APIGatewayProxyEvent>event);

    expect(result).toMatchObject({
      statusCode: 500,
      body: JSON.stringify({ errorMessage: 'file name is not passed' }),
    });
  });

  it('should return 200 response with signed url', async () => {
    const event = {
      queryStringParameters: {
        fileName: 'file.name.ext'
      }
    } as unknown;

    const result = await main(<APIGatewayProxyEvent>event);

    expect(mockedS3).toHaveBeenCalledTimes(1);
    const s3Instance = mockedS3.mock.instances[0];
    expect(s3Instance.getSignedUrlPromise).toHaveBeenCalledWith('putObject', expect.any(Object));
    expect(result).toMatchObject({
      statusCode: 200,
    });
  });
});
