import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: number, locale = "en-US") => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const timeFormat = (date: number, locale = "en-US") => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
