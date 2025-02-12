import { NextResponse } from 'next/server';
import passport from '../../../../../services';

export async function POST(req) {
  try {
    return passport.authenticate('local-signin', (err, user, info) => {
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
        message: 'Signin successful',
        user: {
          id: user.id,
          email: user.email,
          provider: user.provider
        }
      });
    })(req);
  } catch (error) {
    return NextResponse.json(
      { error: 'Signin failed' },
      { status: 500 }
    );
  }
}
