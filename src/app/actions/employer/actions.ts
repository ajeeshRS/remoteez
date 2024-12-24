'use server';
import { authOptions, CustomSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcrypt';
import {
  ChangeCurrentPasswordSchema,
  ChangeCurrentPasswordSchemaType,
} from '@/lib/validators/auth.validator';
import {
  EmployerInfoUpdateSchema,
  EmployerInfoUpdateSchemaType,
} from '@/lib/validators/employer/profile.validator';
import { uploadToCloudinary } from '../actions';
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

export const updateEmployerInfo = async (
  data: EmployerInfoUpdateSchemaType,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;
    const parsed = EmployerInfoUpdateSchema.safeParse(data);

    if (!parsed.success) {
      console.log(parsed.error);
      return {
        success: false,
        error: 'failed to parse object',
      };
    }

    let logoUrl;
    console.log(data.logo)
    if (data.logo instanceof File) {
      console.log('cloudinary point')
      logoUrl = await uploadToCloudinary(data.logo);
      console.log('updated company logo url : ', logoUrl);
    }

    const user = await prisma.employer.findUnique({
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

    if (Object.keys(changedData).length === 0 && logoUrl === user.logo) {
      console.log('No changes detected');
      return {
        success: false,
        error: 'no changes applied',
      };
    }

    await prisma.employer.update({
      where: {
        id,
      },
      data: { ...changedData, logo: logoUrl },
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
