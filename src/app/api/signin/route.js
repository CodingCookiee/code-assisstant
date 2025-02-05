import { signIn } from '@/services/controllers/auth.controller'
import { NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'

export async function POST(req) {
  try {
    const data = await req.json()
    const user = await signIn(data)
    
    // Generate JWT token
    const token = await encode({
      token: { 
        id: user._id,
        email: user.email
      },
      secret: process.env.NEXTAUTH_SECRET,
    })

    const response = NextResponse.json({ 
      success: true,
      user
    })

    // Set authentication cookies
    response.cookies.set({
      name: 'next-auth.session-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    response.cookies.set({
      name: 'next-auth.callback-url',
      value: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return response

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: error.status || 500 })
  }
}
