'use server';
import { authOptions, CustomSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export const getEmployerInfo = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }
    const customSession = session as CustomSession;

    const employerDetails = await prisma.employer.findUnique({
      where: {
        id: customSession.user.id,
      },
      omit: {
        password: true,
      },
      include: {
        jobs: true,
        socialLinks: true,
      },
    });

    if (!employerDetails) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    console.log(employerDetails);
    return {
      success: true,
      employerProfile: employerDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};
