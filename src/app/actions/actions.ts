'use server';
import { generateToken } from '@/lib/utils';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface JwtPayloadWithEmail extends jwt.JwtPayload {
  email: string;
}

export const sendResetPasswordMail = async (email: string) => {
  try {
    console.log(email)
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
    console.log(error)
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
