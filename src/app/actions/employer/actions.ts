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
import {
  CreateJobSchema,
  CreateJobSchemaType,
  UpdateJobSchema,
  UpdateJobSchemaType,
} from '@/lib/validators/employer/jobs.validator';
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
    console.log(data.logo);
    if (data.logo instanceof File) {
      console.log('cloudinary point');
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

export const createJob = async (data: CreateJobSchemaType) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorised',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const parsed = CreateJobSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const user = await prisma.employer.findUnique({
      where: {
        id,
      },
      select: {
        companyName: true,
        companyLocation: true,
        logo: true,
        email: true,
        description: true,
      },
    });

    const completeData = { ...parsed.data, ...user };

    console.log('completeData : ', completeData);

    await prisma.job.create({
      data: {
        employerId: id,
        title: completeData.title,
        minExperience: parseInt(completeData.minExp),
        maxExperience: parseInt(completeData.maxExp),
        minSalary: parseInt(completeData.minSalary),
        maxSalary: parseInt(completeData.maxSalary),
        description: completeData.jobDesc,
        companyName: completeData.companyName as string,
        companyLogo: completeData.logo as string,
        companyDescription: completeData.description as string,
        companyEmail: completeData.email as string,
        jobType: completeData.jobType,
        currency: completeData.currency,
        link: completeData.link,
        skillsRequired: completeData.skills,
      },
    });

    return {
      success: true,
      message: 'Job created successfully',
    };
  } catch (err) {
    console.error('error in creating job : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const updateJob = async (data: UpdateJobSchemaType, jobId: string) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorised',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    const parsed = UpdateJobSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const user = await prisma.employer.findUnique({
      where: {
        id,
      },
      select: {
        companyName: true,
        companyLocation: true,
        logo: true,
        email: true,
        description: true,
      },
    });

    const completeData = { ...parsed.data, ...user };

    console.log('completeData : ', completeData);

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        employerId: id,
        title: completeData.title,
        minExperience: parseInt(completeData.minExp),
        maxExperience: parseInt(completeData.maxExp),
        minSalary: parseInt(completeData.minSalary),
        maxSalary: parseInt(completeData.maxSalary),
        description: completeData.jobDesc,
        companyName: completeData.companyName as string,
        companyLogo: completeData.logo as string,
        companyDescription: completeData.description as string,
        companyEmail: completeData.email as string,
        jobType: completeData.jobType,
        currency: completeData.currency,
        link: completeData.link,
        skillsRequired: completeData.skills,
      },
    });

    return {
      success: true,
      message: 'Job updated successfully',
    };
  } catch (err) {
    console.error('error in updating job : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorised',
      };
    }

    const customSession = session as CustomSession;
    const id = customSession.user.id;

    await prisma.job.delete({
      where: {
        id: jobId,
        employerId: id,
      },
    });

    return {
      success: true,
      message: 'Job deleted successfully',
    };
  } catch (err) {
    console.error('error deleting job : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const getBookmarkCount = async (jobId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: 'Unauthorised',
      };
    }

    const count = await prisma.bookmark.count({
      where: {
        jobId: jobId,
      },
    });

    return {
      success: true,
      count,
    };
  } catch (err) {
    console.error('error getting bookmark count : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};
