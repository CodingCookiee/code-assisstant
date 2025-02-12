import { NextResponse } from 'next/server';
import passport from '../../../../../services/passport';

export async function GET(req) {
  try {
    return passport.authenticate('google', (err, user) => {
      if (err || !user) {
        return NextResponse.redirect(
          new URL('/auth/error', process.env.NEXTAUTH_URL)
        );
      }

      return NextResponse.redirect(
        new URL('/auth/success', process.env.NEXTAUTH_URL)
      );
    })(req);
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/error?message=${encodeURIComponent(error.message)}`, process.env.NEXTAUTH_URL)
    );
  }
}
