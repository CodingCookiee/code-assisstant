import { NextResponse } from 'next/server';
import passport from '../';

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      return passport.authenticate('session', async (err, user) => {
        if (err || !user) {
          return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
        
        // Add user to request object
        req.user = user;
        return handler(req);
      })(req);
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  };
};
