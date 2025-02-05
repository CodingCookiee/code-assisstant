import { getToken } from 'next-auth/jwt';
import createError from '../_utils/createError.js'

export async function authMiddleware(req, res) {
  const token = await getToken({ req });
  if (!token) {
    throw createError(401, 'Unauthorized - Invalid token');
  }
  return token;
  }

