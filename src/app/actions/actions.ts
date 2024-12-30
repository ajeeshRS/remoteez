'use server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { JobType, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { generateToken } from '@/lib/utils';

const prisma = new PrismaClient();

import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface JwtPayloadWithEmail extends jwt.JwtPayload {
  email: string;
}

export const sendResetPasswordMail = async (email: string) => {
  try {
    const jobseeker = await prisma.jobSeeker.findUnique({
      where: {
        email,
      },
    });
    const employer = await prisma.employer.findUnique({
      where: {
        email,
      },
    });
    if (!jobseeker && !employer) {
      return {
        success: false,
        error: 'User is not registered with us',
      };
    }

    const token = generateToken(email);

    if (!token) {
      return {
        success: false,
        error: 'Internal server error',
      };
    }

    const userId = employer ? employer.id : jobseeker?.id;

    await prisma.resetToken.create({
      data: {
        userId: userId as string,
        email,
        token,
        expiresAt: new Date(Date.now() + 3600 * 1000),
      },
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_SECRET,
      },
      secure: false,
      port: 587,
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <p>Hello,</p>
      
            <p>We received a request to reset the password for your account. Please click the link below to reset your password:</p>
      
            <p>
              <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}" 
                 style="background-color: #db2777; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                Reset Your Password
              </a>
            </p>
      
            <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
      
            <p style="color: #888;">This link will expire in 1 hour.</p>
      
            <p style="font-style: italic; color: #888;">This is an automatically generated email. Please do not reply.</p>
            
            <p>Best regards,<br>Remoteez</p>
          </div>
        `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(`Error sending mail to ${email}`, err);
        return {
          success: false,
          error: 'Failed to send mail',
        };
      } else {
        console.log(`Reset Password mail sent to ${email}`, info.response);
        return {
          success: true,
          error: 'Reset mail successfully sent',
        };
      }
    });

    return {
      success: true,
      message: 'Reset password mail sent',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Failed to send mail',
    };
  }
};

export const resetPassword = async (newPassword: string, token: string) => {
  try {
    const { email } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayloadWithEmail;

    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token,
        email,
      },
    });

    console.log('resetToken:', resetToken);

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return {
        success: false,
        error: 'Session expired or invalid token',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!hashedPassword) {
      return {
        success: false,
        error: 'internal server error',
      };
    }

    // user checks
    const jobseeker = await prisma.jobSeeker.findUnique({
      where: {
        id: resetToken.userId,
      },
    });
    console.log(jobseeker);
    const employer = await prisma.employer.findUnique({
      where: {
        id: resetToken.userId,
      },
    });

    console.log(employer);

    // if there is no user with the userId ;return
    if (!jobseeker && !employer) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    //conditionally updates the password field
    if (jobseeker) {
      await prisma.jobSeeker.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      });
    } else if (employer) {
      await prisma.employer.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    await prisma.resetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return {
      success: true,
      message: 'Reset password successfully',
    };
  } catch (err) {
    const error = err as Error;
    console.log('Error resetting password : ', err);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'profile_avatars',
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || '');
        },
      )
      .end(buffer);
  });
};

export const getJobs = async (
  page: number,
  limit: number,
  searchQuery?: string,
  commitmentTypes?: string[],
  experienceTypes?: string[],
  payTypes?: string[],
) => {
  try {
    const skipRecords = (page - 1) * limit;

    const expRanges = experienceTypes?.map((exp) => {
      if (exp.includes('+')) {
        const minExp = parseInt(exp.replace('+', '').trim());
        return { min: minExp, max: 100 };
      }

      const [min, max] = exp
        .split('-')
        .map((num) => parseInt(num.replace('YOE', '').trim()));

      return { min, max };
    });

    const payRanges = payTypes?.map((pay) => {
      if (pay.includes('+')) {
        const minPay = parseInt(pay.replace('+', '').trim());
        return { min: minPay, max: 10000 };
      }

      const [min, max] = pay.split('-').map((num) => parseInt(num));

      return { min, max };
    });

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        take: limit,
        where: {
          AND: [
            {
              ...(searchQuery
                ? { title: { contains: searchQuery, mode: 'insensitive' } }
                : {}),
            },
            {
              ...(commitmentTypes && commitmentTypes.length > 0
                ? {
                    jobType: { in: commitmentTypes as JobType[] },
                  }
                : {}),
            },
            {
              ...(experienceTypes && experienceTypes.length > 0
                ? {
                    OR: expRanges?.map((range) => ({
                      AND: [
                        { minExperience: { lte: range.max } },
                        { maxExperience: { gte: range.min } },
                      ],
                    })),
                  }
                : {}),
            },
            {
              ...(payTypes && payTypes.length > 0
                ? {
                    OR: payRanges?.map((range) => ({
                      AND: [
                        { minSalary: { lte: range.max * 1000 } },
                        { maxSalary: { gte: range.min * 1000 } },
                      ],
                    })),
                  }
                : {}),
            },
          ],
        },
        skip: skipRecords,
        orderBy: {
          postedAt: 'desc',
        },
      }),

      prisma.job.count({
        where: {
          AND: [
            {
              ...(searchQuery
                ? { title: { contains: searchQuery, mode: 'insensitive' } }
                : {}),
            },
            {
              ...(commitmentTypes && commitmentTypes.length > 0
                ? {
                    jobType: { in: commitmentTypes as JobType[] },
                  }
                : {}),
            },
            {
              ...(experienceTypes && experienceTypes.length > 0
                ? {
                    OR: expRanges?.map((range) => ({
                      AND: [
                        { minExperience: { lte: range.max } },
                        { maxExperience: { gte: range.min } },
                      ],
                    })),
                  }
                : {}),
            },
            {
              ...(payTypes && payTypes.length > 0
                ? {
                    OR: payRanges?.map((range) => ({
                      AND: [
                        { minSalary: { lte: range.max * 1000 } },
                        { maxSalary: { gte: range.min * 1000 } },
                      ],
                    })),
                  }
                : {}),
            },
          ],
        },
      }),
    ]);
    console.log(jobs);
    return {
      jobs,
      hasMore: skipRecords + jobs.length < totalCount,
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
};

export const getJobDetails = async (jobId: string) => {
  try {
    if (!jobId) {
      return {
        success: false,
        error: 'Bad request',
      };
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return {
        success: false,
        error: 'Job not found',
      };
    }

    return {
      success: true,
      job,
    };
  } catch (err) {
    console.error('error fetching job details : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};

export const getRecentlyAddedJobs = async () => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedAt: 'desc',
      },
      take: 3,
    });

    return {
      success: true,
      jobs,
    };
  } catch (err) {
    console.error('Error getting recently added jobs : ', err);
    return {
      success: false,
      error: 'Internal server error',
    };
  }
};
