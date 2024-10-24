import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getFormattedDateFromString(input: string) {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return "Invalid date format";
  }

  return date.toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

export function getTimeUntil(date1: string): string {
    if (!date1) return "Invalid date";
    
    const futureDate = new Date(date1);
    const dateNow = new Date();
    if (isNaN(futureDate.getTime())) {
      return "Invalid date format";
    }
  
    // Get the time difference in milliseconds
    if (futureDate.getTime() - dateNow.getTime() < 0) {
      return "Completed";
    }
    const diffMs = Math.abs(futureDate.getTime() - dateNow.getTime());

    // Convert milliseconds to minutes, hours, and days
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Format the output based on the difference
    if (diffDays > 0) {
        return `${diffDays} days remaining`;
    } else if (diffHours > 0) {
        const remainingMinutes = diffMinutes % 60;
        return `${diffHours} h ${remainingMinutes} min remaining`;
    } else {
        return `${diffMinutes} min remaining`;
    }  
}

export function isPowerOfTwo(n: number) {
  if (n == 0)
      return false;
  if ((n & (~(n - 1))) == n)
      return true;
  return false;
}

export function generateCapacity(max: number): number[] {
  if (max < 1) {
    return [2];
  }

  const result: number[] = [];
  let value = 2;

  while (value <= max) {
    result.push(value);
    value *= 2; 
  }

  return result;
}

export function getPlacingString(i: number):string {
  if (i < 0) return "";
  if (i == 1) return "Winner";
  if (i == 2) return "Runner Up"
  let j = i % 10;
  let k = i % 100;
  if (j === 1 && k !== 11) {
      return i + "st place";
  }
  if (j === 2 && k !== 12) {
      return i + "nd place";
  }
  if (j === 3 && k !== 13) {
      return i + "rd place";
  }
  return i + "th place";
}

export function upperCaseToCapitalised(s: string):string {
  return capitalise(s.toLowerCase());
}

export function getPercentage(n: number, total: number): number {
  return 100 * n / total;
}
