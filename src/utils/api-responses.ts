import axios, { AxiosError } from 'axios';
import { Translate } from 'next-translate';
import { isNullOrUndefined } from './validate-js-utils';

type ResultTypes = 'success' | 'error';
type ErrorWithMessage = Error | { message: string };

export interface Result<Data = unknown> {
  type: ResultTypes;
  data: Data | null;
  error: ErrorWithMessage | null;
  timestamp: string;
}

export class ResultSuccess<Data = unknown> implements Result<Data> {
  readonly type: ResultTypes = 'success';
  data: Data;
  readonly error = null;
  readonly timestamp: string;

  constructor(data: Data) {
    this.timestamp = new Date().toLocaleString();
    this.data = data;
  }
}

export class ResultError implements Result<null> {
  readonly type: ResultTypes = 'error';
  readonly data = null;
  error: ErrorWithMessage;
  readonly timestamp: string;

  constructor(err: ErrorWithMessage | string) {
    this.timestamp = new Date().toLocaleString();
    if (typeof err === 'string') {
      this.error = { message: err };
      return;
    }
    this.error = err;
  }
}

export function getErrorMessage(error: unknown, t: Translate) {
  if (axios.isAxiosError(error)) {
    if (error.response) return t(error.response.data.error?.message);
    if (error.request) return t('common:errors.api.network-issue');
  }

  if (error instanceof ResultError) return error.error.message;
  if (error instanceof Error) return error.message;

  return t('common:errors.api.other');
}
