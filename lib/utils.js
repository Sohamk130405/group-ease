import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function handleError({ error, message }) {
  console.error(message, error);
  return {
    success: false,
    message: message || "An unexpected error occurred.",
    error: error?.message || "No error details provided.",
  };
}

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));
