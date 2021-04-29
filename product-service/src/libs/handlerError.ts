export default class HandlerError extends Error {
  statusCode: number;

  constructor(statusCode: number, ...args) {
    super(...args);

    this.statusCode = statusCode;
  }
}