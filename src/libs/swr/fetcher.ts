import axios, { AxiosRequestConfig } from 'axios';

export const axiosFetcher = <T>(resourceUrl: string) =>
  axios.get<T>(resourceUrl).then((res) => res.data);
