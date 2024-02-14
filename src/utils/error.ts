type CLIENT_HTTP_ERROR_STATUS_CODES = 400;

export class ClientError extends Error {
  statusCode: CLIENT_HTTP_ERROR_STATUS_CODES;

  constructor(message: string, statusCode: CLIENT_HTTP_ERROR_STATUS_CODES) {
    super(message);
    this.statusCode = statusCode;
  }
}
