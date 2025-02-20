import { NextResponse } from 'next/server';
import { passport, generateToken } from '../../../../../services';

export async function POST(req) {
  try {
    const body = await req.json();

    // Create a custom request object for Passport:  NextRequest object is immutable
    const customReq = {
      body,
      ...req
    };
    
    return new Promise((resolve, reject) => {
      passport.authenticate('local-signup', { session: false }, (err, user, info) => {
        if (err) {
          
          return resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        }
        
        if (!user) {
          
          return resolve(NextResponse.json({ error: info?.message || 'Missing credentials' }, { status: 400 }));
        }

      
        const token = generateToken(user);
        
        return resolve(NextResponse.json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          },
          token
        }, { status: 201 }));
      })(customReq);
    });
  } catch (error) {
    console.log('Signup route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
