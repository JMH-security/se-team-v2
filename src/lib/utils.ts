import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toNumber = (val: string | number | null) => {
  if (!val) return null;
  return !isNaN(Number(val)) ? Number(val) : null;
};

export { toNumber };

