import { NextApiHandler } from 'next';
import { Result, ResultError } from '@utils/api-responses';
import handleError from './error-handler';

export type ApiHandler = NextApiHandler<Result>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;
type HttpMethodHandlerSelector = (handlers: HttpMethodHandlers) => ApiHandler;

export class ForbiddenHttpMethodError extends Error {
  httpMethod: string;

  constructor(httpMethod: string, message?: string) {
    super(message);
    this.httpMethod = httpMethod;
  }
}

export class UnsupportedHttpMethodError extends Error {
  httpMethod: HttpMethod;

  constructor(httpMethod: HttpMethod, message?: string) {
    super(message);
    this.httpMethod = httpMethod;
  }
}

export const handleHttpMethod: HttpMethodHandlerSelector =
  (handlers) => async (req, res) => {
    try {
      const httpMethod = req.method?.toLowerCase() ?? '';
      if (!(httpMethod in handlers))
        throw new ForbiddenHttpMethodError(httpMethod);

      const method = httpMethod as HttpMethod;
      const handle = handlers[method];
      if (!handle) throw new UnsupportedHttpMethodError(method);

      return await Promise.resolve(handle(req, res));
    } catch (err) {
      return await Promise.resolve(handleError(req, res, err));
    }
  };
