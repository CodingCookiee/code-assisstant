import { rateLimit } from '../middleware/rateLimit.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { NextResponse } from 'next/server'
import createError from '../_utils/createError.js'

export async function GET(req) {
  try {
    await rateLimit(req)
    const token = await authMiddleware(req)
    const user = await getUser(token.sub)
    
    return NextResponse.json({
      success: true,
      user
    })
  } catch (error) {
    console.log('Error getting user data:', error.message)
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
