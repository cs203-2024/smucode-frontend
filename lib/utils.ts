import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isPowerOfTwo(n: number) {
  if (n == 0)
      return false;
  if ((n & (~(n - 1))) == n)
      return true;
  return false;
}
