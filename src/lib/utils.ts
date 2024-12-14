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

export const getDurationInYM = (dateString: string) => {
  const splitted = dateString.split('~');

  const startDate = new Date(splitted[0]);
  const endDate = new Date(splitted[1]);

  const years = endDate.getFullYear() - startDate.getFullYear();
  const months = endDate.getMonth() - startDate.getMonth();
  console.log(years);
  console.log(months);
  return `${years} Years & ${months} Months`;
};

export const extractDates = (duration: string) => {
  const dates = duration.split('~');
  const start = dates[0].trim();
  const end = dates[1].trim();
  return { start, end };
};
