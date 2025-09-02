import { User } from "@/shared/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateIranianMobileNumber = (number: string): boolean => {
  const iranianMobileRegex = /^(09|\+989|00989)\d{9}$/;
  return iranianMobileRegex.test(number);
};



const USER_KEY = "user-data";

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};