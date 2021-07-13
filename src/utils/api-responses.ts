type ResultTypes = 'success' | 'error';
type ErrorWithMessage = Error | { message: string };

export interface Result<Data = unknown> {
  type: ResultTypes;
  data: Data | null;
  error: ErrorWithMessage | null;
  timestamp: Date;
}

export class ResultSuccess<Data = unknown> implements Result<Data> {
  readonly type: ResultTypes = 'success';
  data: Data;
  readonly error = null;
  readonly timestamp: Date;

  constructor(data: Data) {
    this.timestamp = new Date();
    this.data = data;
  }
}

export class ResultError implements Result<null> {
  readonly type: ResultTypes = 'error';
  readonly data = null;
  error: ErrorWithMessage;
  readonly timestamp: Date;

  constructor(err: ErrorWithMessage | string) {
    this.timestamp = new Date();
    if (typeof err === 'string') {
      this.error = { message: err };
      return;
    }
    this.error = err;
  }
}
