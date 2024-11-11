import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JobSeekerSignupSchema } from '@/lib/validators/auth.validator';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = JobSeekerSignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Parsing failed!' }, { status: 403 });
    }

    const {
      fullname,
      email,
      password,
      experience,
      desiredJobTitle,
      currentLocation,
    } = parsed.data;

    const existingUser = await prisma.jobSeeker.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists!' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return NextResponse.json(
        { message: 'Some error occured during signup' },
        { status: 400 },
      );
    }

    const user = await prisma.jobSeeker.create({
      data: {
        email,
        fullName: fullname,
        password: hashedPassword,
        experienceRange: experience,
        desiredJobTitle,
        location: currentLocation,
      },
    });
    console.log(user);
    return NextResponse.json({ message: 'Signup success' }, { status: 201 });
  } catch (error) {
    console.error('error during jobseeker signup:', error);
    return NextResponse.json(
      { message: 'Server error, please try again later' },
      { status: 500 },
    );
  }
}
