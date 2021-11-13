import { NextApiRequest } from 'next';

export type IpLocation = {
  ipCountry?: string;
  ipCountryRegion?: string;
  ipCity?: string;
};

const getClientIpLocation = (req: NextApiRequest): IpLocation => ({
  ipCountry: req.headers['x-vercel-ip-country']?.toString(),
  ipCountryRegion: req.headers['x-vercel-ip-country-region']?.toString(),
  ipCity: req.headers['x-vercel-ip-city']?.toString(),
});

export default getClientIpLocation;
