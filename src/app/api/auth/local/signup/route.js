import { NextResponse } from 'next/server';
import passport from '../../../../../services';

export async function POST(req) {
  try {
    return passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return NextResponse.json(
          { error: err.message },
          { status: 500 }
        );
      }
      
      if (!user) {
        return NextResponse.json(
          { error: info.message },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: 'Signup successful',
        user: {
          id: user.id,
          email: user.email,
          provider: user.provider
        }
      });
    })(req);
  } catch (error) {
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
