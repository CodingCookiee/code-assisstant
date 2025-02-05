import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from '@/services/controllers/auth.controller'
import { redis } from '@/services/lib/redis'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await signIn(credentials)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  
  session: { 
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60 
  },
  
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        
        // Redis caching for user data
        await redis.set(
          `user:${user.id}`,
          JSON.stringify(user),
          'EX',
          5 * 24 * 60 * 60
        )
      }
      return token
    },
    
    async session({ session, token }) {
      session.user.id = token.id
      
      // Redis caching for session data
      await redis.set(
        `session:${token.id}`,
        JSON.stringify(session),
        'EX',
        5 * 24 * 60 * 60
      )
      return session
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
})

export { handler as GET, handler as POST }
