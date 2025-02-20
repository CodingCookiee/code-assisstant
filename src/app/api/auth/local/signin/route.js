import { NextResponse } from 'next/server';
import { passport, generateToken } from '../../../../../services';

export async function POST(req) {
  try {
    const body = await req.json();
    

    // Create custom request object for Passport
    const customReq = {
      body,
      ...req
    };

    return new Promise((resolve) => {
      passport.authenticate('local-signin', { session: false }, (err, user, info) => {
        if (err) {
          
          return resolve(NextResponse.json(
            { error: err.message },
            { status: 500 }
          ));
        }
        
        if (!user) {
        
          return resolve(NextResponse.json(
            { error: info?.message || 'Authentication failed' },
            { status: 401 }
          ));
        }

        const token = generateToken(user);
       

        return resolve(NextResponse.json({
          user: {
            id: user._id,
            email: user.email,
            name: user.name
          },
          token
        }));
      })(customReq);
    });
  } catch (error) {
    console.log('Signin route error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
