import { FC } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';

const axiosFetcher = <T,>(resourceUrl: string) =>
  axios.get<T>(resourceUrl).then((res) => res.data);

const SWRDefaultConfigProvider: FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        onErrorRetry: async (err, key, config, revalidate, revalidateOps) => {
          // Don't retry on 404
          if (err.response.status === 404) return;

          // Exponenetial back-off retry
          setTimeout(
            () => revalidate(revalidateOps),
            5000 * 2 ** (revalidateOps.retryCount - 1)
          );
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRDefaultConfigProvider;
