import { FC } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';

const axiosFetcher = <T,>(resourceUrl: string) =>
  axios.get<T>(resourceUrl).then((res) => res.data);

const SWRDefaultConfigProvider: FC = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: axiosFetcher,
    }}
  >
    {children}
  </SWRConfig>
);

export default SWRDefaultConfigProvider;
