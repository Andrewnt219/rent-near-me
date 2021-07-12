type ResultTypes = 'success' | 'error';
type ErrorWithMessage = Error | { message: string };

export interface Result<Data = unknown> {
  type: ResultTypes;
  data: Data | null;
  error: ErrorWithMessage | null;
}

export class ResultSuccess<Data = unknown> implements Result<Data> {
  readonly type: ResultTypes = 'success';
  data: Data;
  readonly error = null;

  constructor(data: Data) {
    this.data = data;
  }
}

export class ResultError implements Result<null> {
  readonly type: ResultTypes = 'error';
  readonly data = null;
  error: ErrorWithMessage;

  constructor(err: ErrorWithMessage | string) {
    if (typeof err === 'string') {
      this.error = { message: err };
      return;
    }
    this.error = err;
  }
}
