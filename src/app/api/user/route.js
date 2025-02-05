import { getUser } from '@/services/controllers/auth.controller'
import { authMiddleware } from '@/services/middleware/auth.middleware'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const token = await authMiddleware(req)
    const user = await getUser(token.id)
    
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


export async function POST(req) {
  try {
    await rateLimit(req)
    const data = await req.json()
    const token = await authMiddleware(req)
    
    // Handle user data update logic here
    return NextResponse.json({ 
      success: true,
      message: 'User data updated'
    })
  } catch (error) {
    console.log('Error updating user data:', error.message)
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: error.status || 500 })
  }
}
