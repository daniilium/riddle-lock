import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// объединяет классы
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
