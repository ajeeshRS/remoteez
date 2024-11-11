import { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SigninSchema } from './validators/auth.validator';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
const prisma = new PrismaClient();

enum Role {
  JOBSEEKER,
  EMPLOYER,
}

export interface CustomSessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface CustomSession extends DefaultSession {
  user: CustomSessionUser;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '',
        },
      },
      async authorize(credentials): Promise<any> {
        const result = SigninSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error('Input validation failed');
        }

        const { email, password } = result.data;

        const jobSeeker = await prisma.jobSeeker.findUnique({
          where: { email },
        });

        const employer = await prisma.employer.findUnique({
          where: { email },
        });

        const user = jobSeeker || employer;

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) throw new Error('Invalid credentials');

        if (jobSeeker) {
          return {
            id: jobSeeker.id,
            email: user.email,
            name: jobSeeker.fullName,
            role: 'JOBSEEKER',
          };
        } else if (employer) {
          return {
            id: employer?.id,
            email: employer?.email,
            name: employer?.name,
            role: 'EMPLOYER',
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const newSession: CustomSession = session as CustomSession;
      if (newSession.user) {
        newSession.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
