import { signIn } from '@/services/controllers/auth.controller'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const data = await req.json()
    const user = await signIn(data)
    
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
