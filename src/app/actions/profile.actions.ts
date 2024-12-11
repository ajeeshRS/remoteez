'use server';

import { authOptions, CustomSession } from '@/lib/auth';
import {
  personalInfoSchema,
  personalInfoSchemaType,
} from '@/lib/validators/profile.validator';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export const getJobseekerInfo = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('UnAuthorized');
    }
    const customSession = session as CustomSession;

    const jobSeekerDetails = await prisma.jobSeeker.findUnique({
      where: {
        id: customSession.user.id,
      },
      omit: {
        password: true,
      },
      include: {
        projects: true,
        previousCompanies: true,
      },
    });

    if (!jobSeekerDetails) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    console.log(jobSeekerDetails);
    return {
      success: true,
      jobSeekerProfile: jobSeekerDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const updateJobseekerInfo = async (data: personalInfoSchemaType) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('UnAuthorized');
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;
    const parsed = personalInfoSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: 'failed to parse object',
      };
    }

    console.log(parsed.data);

    const user = await prisma.jobSeeker.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'user not found',
      };
    }

    const changedData = Object.fromEntries(
      Object.entries(parsed.data).filter(([key, value]) => {
        return value !== user[key as keyof typeof user];
      }),
    );

    console.log(changedData);

    if (Object.keys(changedData).length === 0) {
      console.log('No changes detected');
      return {
        success: false,
        error: 'no changes applied',
      };
    }

    await prisma.jobSeeker.update({
      where: {
        id,
      },
      data: changedData,
    });

    return {
      success: true,
      message: 'Profile updated',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};
