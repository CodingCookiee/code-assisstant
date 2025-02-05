import { signUp } from '../../services/controllers/auth.controller.js'
import { rateLimiter } from '../../services/middleware/rateLimit.middleware.js'
import { NextResponse} from 'next/server'

export async function POST(req) {
    try {
      await rateLimit(req)
      const data = await req.json()
      const user = await signUp(data)
      
      return NextResponse.json({ 
        success: true, 
        user 
      })
    } catch (error) {
        console.log('Error Signing up:', error.message);
      return NextResponse.json({ 
        success: false, 
        message: error.message 
      }, { status: error.status || 500 })
    }
  }