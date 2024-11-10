import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { EmployerSignupSchema } from '@/lib/validators/auth.validator';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = EmployerSignupSchema.parse(body);

    if (!parsed) {
      return NextResponse.json({ message: 'Parsing failed!' }, { status: 403 });
    }

    const { companyName, email, password, role, companyLocation } = parsed;

    const existingEmployer = await prisma.employer.findUnique({
      where: {
        email,
      },
    });

    if (existingEmployer) {
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

    const employer = await prisma.employer.create({
      data: {
        email,
        companyName,
        password: hashedPassword,
        role,
        companyLocation,
      },
    });
    
    console.log(employer);
    return NextResponse.json({ message: 'Signup success' }, { status: 201 });
  } catch (error) {
    console.log('error during employer signup:', error);
    return NextResponse.json(
      { message: 'Server error, please try again later' },
      { status: 500 },
    );
  }
}
