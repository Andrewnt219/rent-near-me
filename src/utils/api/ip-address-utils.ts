import { NextApiRequest } from 'next';

export function getClientIpAddress(req: NextApiRequest) {
  return (
    req.headers['X-Forwarded-For']?.toString()?.split(/, /)[0] ??
    req.connection.remoteAddress ??
    req.socket.remoteAddress
  );
}
