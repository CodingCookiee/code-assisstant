import { NextResponse } from 'next/server';
import passport from '../../../../../services';
import redisClient from '../../../../../services';

export async function POST(req) {
  try {
    return passport.authenticate('session', async (err, user) => {
      if (err || !user) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }

      // Destroy Redis session
      const sessionKey = `session:${user.id}`;
      await redisClient.del(sessionKey);

      // Clear session cookie
      const response = NextResponse.json({ message: 'Logout successful' });
      response.cookies.delete('connect.sid');
      
      return response;
    })(req);
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
