import { HttpMethod } from '../http-method-handler';

export class HttpMethodUnsupportedError extends Error {
  httpMethod: HttpMethod;

  constructor(httpMethod: HttpMethod, message?: string) {
    super(message);
    this.httpMethod = httpMethod;
  }
}
