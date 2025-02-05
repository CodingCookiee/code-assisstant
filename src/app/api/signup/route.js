import { signUp } from '../../../services/controllers/auth.controller'
import { rateLimit } from '../../../services/middleware/rateLimit.middleware'
import { NextResponse } from 'next/server'

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
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: error.status || 500 })
  }
}
