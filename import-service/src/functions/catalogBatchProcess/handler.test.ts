import SNS from 'aws-sdk/clients/sns';
import { SQSEvent } from 'aws-lambda';
import axios from 'axios';

import { main } from './handler';

jest.mock('axios');
jest.mock('aws-sdk/clients/sns', () => {
  return jest.fn().mockImplementation(function () {
    this.publish = jest.fn();
  });
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSNS = SNS as jest.MockedClass<typeof SNS>;

describe('#catalogBatchService', () => {
  const event = {
    Records: [{
      body: '{}'
    }]
  } as unknown;

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should send success notification if product was added', async () => {
    mockedAxios.post.mockResolvedValue(true);

    await main(<SQSEvent>event, {} as any, () => {});

    expect(mockedSNS).toHaveBeenCalledTimes(1);
    const snsInstance = mockedSNS.mock.instances[0];
    expect(snsInstance.publish).toBeCalledTimes(1);
  });

  it('should send failure notification if product was not added', async () => {
    mockedAxios.post.mockRejectedValue(true);

    await main(<SQSEvent>event, {} as any, () => {});

    expect(mockedSNS).toHaveBeenCalledTimes(1);
    const snsInstance = mockedSNS.mock.instances[0];
    expect(snsInstance.publish).toBeCalledTimes(1);
  });
});
