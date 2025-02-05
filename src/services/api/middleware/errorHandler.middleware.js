import { NextResponse } from 'next/server'

export const errorHandler = (error) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  return NextResponse.json(
    {
      success: false,
      message,
      status: error.status,
    },
    { status: statusCode }
  )
}
