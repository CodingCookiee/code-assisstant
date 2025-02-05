import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from '@/services/controllers/auth.controller'
import { redis } from '@/services/lib/redis'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await signIn(credentials)
          return user
        } catch (error) {
          throw new Error(error.message)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, // 5 days
  },
  callbacks: {
    async session({ session, token }) {
      await redis.set(
        `session:${token.sub}`,
        JSON.stringify(session),
        'EX',
        5 * 24 * 60 * 60
      )
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        await redis.set(
          `user:${user.id}`,
          JSON.stringify(user),
          'EX',
          5 * 24 * 60 * 60
        )
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
