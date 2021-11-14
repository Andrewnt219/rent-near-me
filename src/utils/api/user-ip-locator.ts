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
  ipCity: tryDecodeQueryParam(req.headers['x-vercel-ip-city']).decoded,
  ipCountryRegion: req.headers['x-vercel-ip-country-region']?.toString() ?? '',
  ipCountry: req.headers['x-vercel-ip-country']?.toString() ?? '',
});

export default getClientIpInfo;
