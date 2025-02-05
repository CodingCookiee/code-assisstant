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
    maxAge: 5 * 24 * 60 * 60 // 5 days
  },
  
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NEXT_PUBLIC_DOMAIN // Add your domain
      }
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
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
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        await redis.set(
          `session:${token.id}`,
          JSON.stringify(session),
          'EX',
          5 * 24 * 60 * 60
        )
      }
      return session
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  },

  debug: process.env.NODE_ENV === 'development'
})

export { handler as GET, handler as POST }
