import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateToken = (email: string) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ email }, secret as string, {
    expiresIn: '1h',
  });
  return token;
};

