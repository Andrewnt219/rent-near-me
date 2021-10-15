export class HttpMethodForbiddenError extends Error {
  httpMethod: string;

  constructor(httpMethod: string, message?: string) {
    super(message);
    this.httpMethod = httpMethod;
  }
}
