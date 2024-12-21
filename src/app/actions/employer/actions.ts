'use server';
import { authOptions, CustomSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import {
  ChangeCurrentPasswordSchema,
  ChangeCurrentPasswordSchemaType,
} from '@/lib/validators/auth.validator';
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

export const changeEmployerCurrentPassword = async (
  data: ChangeCurrentPasswordSchemaType,
) => {
  try {
    console.log('reached employer password controller');
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorised',
      };
    }
    const parsed = ChangeCurrentPasswordSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const user = await prisma.employer.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const isPasswordMatches = await bcrypt.compare(
      data.currentPassword,
      user?.password,
    );

    if (!isPasswordMatches) {
      return {
        success: false,
        error: 'Incorrect current password',
      };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.employer.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      success: true,
      message: 'Password changed succesfully',
    };
  } catch (err) {
    console.error('error updating password :', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};
