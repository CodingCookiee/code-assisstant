import { getToken } from 'next-auth/jwt'
import createError from '../_utils/createError.js'

export async function authMiddleware(req) {
  const token = await getToken({ 
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  })

  if (!token) {
    throw createError(401, 'Unauthorized - Invalid token')
  }

  return {
    id: token.id,
    email: token.email
  }
}
