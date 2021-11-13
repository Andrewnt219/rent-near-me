import { tryDecodeQueryParam } from '@utils/string-utils';
import { NextApiRequest } from 'next';
import requestIp from 'request-ip';

export type IpAddressInfo = {
  ipAddress?: string;
  ipCountry?: string;
  ipCountryRegion?: string;
  ipCity?: string;
};

const getClientIpInfo = (req: NextApiRequest): IpAddressInfo => ({
  ipAddress: requestIp.getClientIp(req) ?? 'Unknown',
  ipCountry: tryDecodeQueryParam(req.headers['x-vercel-ip-country']).decoded,
  ipCountryRegion: req.headers['x-vercel-ip-country-region']?.toString() ?? '',
  ipCity: req.headers['x-vercel-ip-city']?.toString() ?? '',
});

export default getClientIpInfo;
