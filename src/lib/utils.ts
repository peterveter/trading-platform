import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPL(value: number) {
  return value < 0 ? `-$${Math.abs(value)}` : `$${value}`;
}


