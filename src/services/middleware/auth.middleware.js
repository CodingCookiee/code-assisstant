import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const requireAuth = (handler) => {
  return async (req) => {
    try {
      // Extract the authorization header
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
      }

      const token = authHeader.split(' ')[1];

      // Verify the token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user to request object
        req.user = decoded;
        
        // Call the handler with the authenticated request
        return handler(req);
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return NextResponse.json({ error: 'Token expired' }, { status: 401 });
        }
        if (error instanceof jwt.JsonWebTokenError) {
          return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
        throw error;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
  };
};