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

  const startDate = new Date(splitted[0].trim());
  const endDate = new Date(splitted[1].trim());

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearText = years == 1 ? 'Year' : 'Years';
  const monthText = years == 1 ? 'Month' : 'Months';

  if (years === 0) {
    return `${months} ${monthText}`;
  }

  if (months === 0) {
    return `${years} ${yearText}`;
  }

  return `${years} ${yearText} & ${months} ${monthText}`;
};

export const extractDates = (duration: string) => {
  const dates = duration.split('~');
  const start = dates[0].trim();
  const end = dates[1].trim();
  return { start, end };
};
