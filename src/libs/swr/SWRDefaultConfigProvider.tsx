import { FC } from 'react';
import { SWRConfig } from 'swr';
import { axiosFetcher } from './fetcher';

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
