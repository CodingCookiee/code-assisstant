import { NextResponse } from 'next/server';
import passport from '../../../../../services';

export async function GET(req) {
  try {
    return passport.authenticate('github', {
      session: false,
      failureRedirect: '/auth/error'
    })(req, undefined, async (err, user) => {
      if (err || !user) {
        return NextResponse.redirect(new URL('/auth/error', req.url));
      }

      // Create session
      const sessionKey = `session:${user.id}`;
      await redisClient.set(
        sessionKey,
        JSON.stringify(user),
        'EX',
        process.env.SESSION_TTL || 86400
      );

      // Set session cookie
      const response = NextResponse.redirect(new URL('/dashboard', req.url));
      response.cookies.set('session', sessionKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: process.env.SESSION_TTL || 86400
      });

      return response;
    });
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/error', req.url));
  }
}
