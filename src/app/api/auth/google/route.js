import { NextResponse } from 'next/server';
import passport from '../../../../../services/passport';

export async function GET() {
  try {
    return passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false
    })();
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/error?message=${encodeURIComponent(error.message)}`, process.env.NEXTAUTH_URL)
    );
  }
}
